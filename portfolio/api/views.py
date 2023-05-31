from rest_framework import generics, permissions
from django.shortcuts import get_object_or_404
from .serializers import PostSerializer, CreatePostSerializer, PostTogglePublishSerializer, PredictionSerializer, PredictionViewSerializer, PictureViewSerializer, ImageShapeSerializer
from .models import Post, Prediction, Picture
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from django.db import transaction
from django.db.models import Avg
import os
import io
import requests
import base64
import json
import joblib
import numpy as np
from scipy import stats as scistat
import skimage.draw
from PIL import Image
import matplotlib.pyplot as plt
import matplotlib
matplotlib.use('Agg')


# Create your views here.

@csrf_exempt
def detect_shapes(request, picture_id):

    from . mrcnn_defs import MaskRCNN, Config
    from . mrcnn_defs import display_instances

    CLASS_NAMES = ['BG', 'Rectangle', 'Band']

    class PredictionConfig(Config):
        NAME = "rothko_cfg_coco"
        NUM_CLASSES = len(CLASS_NAMES)
        GPU_COUNT = 1
        IMAGES_PER_GPU = 1

    import keras.backend.tensorflow_backend as tb

    def load_model():
        tb._SYMBOLIC_SCOPE.value = True
        base_dir = os.path.dirname(os.path.abspath(__file__))
        model_dir = os.path.join(base_dir, 'ml_models/logs')
        model = MaskRCNN(mode='inference', model_dir=model_dir,
                         config=PredictionConfig())
        tf_model_path = os.path.join(
            model_dir, 'mask_rcnn_rothko_cfg_coco_0007.h5')
        model.load_weights(tf_model_path, by_name=True)
        class_names = ['BG', 'Rectangle', 'Band']
        return model, class_names

    model, class_names = load_model()
    picture = Picture.objects.get(pk=picture_id)
    request_data = json.loads(request.body.decode('utf-8'))
    min_score = float(request_data.get('min_score', 0.5))
    image_url = picture.link
    image_filename = os.path.basename(image_url)
    image_path = os.path.join(os.getcwd(), image_filename)
    response = requests.get(image_url)
    if response.status_code == 200:
        with open(image_path, 'wb') as image_file:
            image_file.write(response.content)

    # image = skimage.io.imread(picture.link)
    image = skimage.io.imread(image_path)

    try:
        img_array = np.array(image)
    except TypeError:
        image = image.convert('RGB')
        img_array = np.array(image)
    detected = model.detect([img_array])
    results = detected[0]
    num_shapes = len(results['class_ids'])
    idxs = np.where(results['scores'] >= float(min_score))[0]
    scores = results['scores'][idxs]
    masks = results['masks'][:, :, idxs]
    class_ids = results['class_ids'][idxs]
    num_displayed_shapes = len(class_ids)

    # Save processed image to buffer
    save_fig_path = os.path.join(
        os.path.dirname(__file__), './saved_img.png')
    total_pixels = img_array.shape[0] * img_array.shape[1]
    display_instances(img_array, results['rois'], results['masks'], results['class_ids'],
                      class_names, results['scores'], save_fig_path=save_fig_path, min_score=float(min_score))

    def is_bright(rgb):
        brightness = np.sqrt(np.dot(rgb, rgb))
        return brightness > 128

    region_pixels = []
    region_colors = []

    # Convert image to base64-encoded string
    im = Image.open(save_fig_path)
    buf = io.BytesIO()
    im.save(buf, format='PNG')
    byte_im = buf.getvalue()
    img_data = base64.b64encode(byte_im).decode()
    detected_image = f"data:image/png;base64,{img_data}"

    analyze_images = []
    for i in range(masks.shape[2]):
        mask = masks[:, :, i]
        pixels = img_array[mask]
        colors = np.mean(pixels, axis=0)
        height, width = mask.shape
        region_pixels.append(pixels)
        region_colors.append(colors)
        max_horizontal_pixels = np.max(np.sum(mask, axis=0))
        max_vertical_pixels = np.max(np.sum(mask, axis=1))
        region_surface = np.round((np.sum(mask) / total_pixels * 100), 1)
        for i in range(len(region_colors)):
            rgb = region_colors[i]
        if is_bright(rgb):
            brightness = "bright"
        else:
            brightness = "dull"

        # Create a figure with subplots for the color rectangle and histogram
        fig, axs = plt.subplots(1, 2, figsize=(10, 5), tight_layout=True)

        # Add the color rectangle subplot
        color_rect = np.array([colors])
        axs[0].imshow(color_rect.reshape(1, 1, 3)/255.0)
        axs[0].set_title('Average Color')
        axs[0].axis('off')

        # Add the histogram subplot
        axs[1].hist(pixels[:, 0], bins=256,
                    color='Red', alpha=0.5, label='Red')
        axs[1].hist(pixels[:, 1], bins=256, color='Green',
                    alpha=0.5, label='Green')
        axs[1].hist(pixels[:, 2], bins=256, color='Blue',
                    alpha=0.5, label='Blue')
        axs[1].legend(loc='upper right')
        axs[1].set_xlim([0, 255])
        axs[1].set_xlabel('Color Value')
        axs[1].set_ylabel('Frequency')
        axs[1].set_title('Histogram')
        plt.suptitle('Region {} - Class: {} - Score: {:.2f} - Color {}: ({:.2f}, {:.2f}, {:.2f}) - Max Horizontal Pixels: {} - Max Vertical Pixels: {} - Region surface: {}%'.format(
            i+1, class_names[results.get('class_ids')[idxs[i]]
                             ], results.get('scores')[idxs[i]], brightness,
            region_colors[i][0], region_colors[i][1], region_colors[i][2],
            max_horizontal_pixels, max_vertical_pixels, region_surface), fontsize=9)

        plt.savefig(os.path.join(os.path.dirname(
            os.path.abspath(__file__)), './analyze.png'))

        analyze_fig_path = os.path.join(os.path.dirname(
            os.path.abspath(__file__)), './analyze.png')

        analize_img = Image.open(analyze_fig_path)
        buffer = io.BytesIO()
        analize_img.save(buffer, format='PNG')
        byte_img = buffer.getvalue()
        i_data = base64.b64encode(byte_img).decode()
        analyze_image = f"data:image/png;base64,{i_data}"
        analyze_images.append(analyze_image)
        plt.close()
    # Include image data in JsonResponse
    response = {'success': True, 'picture_id': picture_id,
                'num_displayed_shapes': num_displayed_shapes,
                'detected_image': detected_image,
                'num_shapes': num_shapes,
                'analyze_images': analyze_images}
    os.remove(image_path)

    return JsonResponse(response)


class PictureDetailView(generics.RetrieveAPIView):
    serializer_class = PictureViewSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

    def get_object(self):
        picture = self.kwargs['picture']
        return get_object_or_404(Picture, picture=picture)


@api_view(['POST'])
@permission_classes([AllowAny])
@csrf_exempt
def predict(request):
    serializer = PredictionSerializer(data=request.data)
    if serializer.is_valid():
        input1 = serializer.validated_data['input1']
        model_path = os.path.join(
            os.path.dirname(__file__), 'ml_models/linear_regression')
        model = joblib.load(model_path)
        prediction = np.round(np.exp(model.predict([[input1]]))).tolist()

        # Save input and output data to database
        with transaction.atomic():
            prediction_obj = Prediction(input=input1, output=prediction[0])
            prediction_obj.save()

        return JsonResponse({'prediction': prediction})
    else:
        return JsonResponse(serializer.errors, status=400)


@api_view(['GET'])
def stats(request):
    input_mean = Prediction.objects.aggregate(Avg('input'))['input__avg']
    input_median = np.median(
        Prediction.objects.values_list('input', flat=True))
    input_mode = scistat.mode(
        Prediction.objects.values_list('input', flat=True))[0][0]

    output_mean = Prediction.objects.aggregate(Avg('output'))['output__avg']
    output_median = np.median(
        Prediction.objects.values_list('output', flat=True))
    output_mode = scistat.mode(
        Prediction.objects.values_list('output', flat=True))[0][0]

    return JsonResponse({
        'input_stats': {
            'mean': input_mean,
            'median': input_median,
            'mode': input_mode
        },
        'output_stats': {
            'mean': output_mean,
            'median': output_median,
            'mode': output_mode
        }
    })


class PictureView(generics.ListAPIView):
    serializer_class = PictureViewSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

    def get_queryset(self):
        return Picture.objects.all().order_by('id')


class PredictView(generics.ListAPIView):
    serializer_class = PredictionViewSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

    def get_queryset(self):
        return Prediction.objects.all().order_by('-created_at')


class PostView(generics.ListAPIView):
    serializer_class = PostSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

    def get_queryset(self):
        user = self.request.user
        return Post.objects.filter(user=user).order_by('-created')


class CreatePostView(generics.ListCreateAPIView):
    serializer_class = CreatePostSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

    def get_queryset(self):
        user = self.request.user
        return Post.objects.filter(user=user).order_by('-created')

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)


class PostRetrieveUpdateDestroy(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = PostSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

    def get_queryset(self):
        return Post.objects.all()


class PostTogglePublish(generics.UpdateAPIView):
    serializer_class = PostTogglePublishSerializer
    permission_classes = [permissions.IsAdminUser]

    def get_queryset(self):
        user = self.request.user
        return Post.objects.filter(user=user)

    def perform_update(self, serializer):
        serializer.instance.completed = not (serializer.instance.completed)
        serializer.save()
