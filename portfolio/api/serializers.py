from rest_framework import serializers
from .models import Post, Prediction, Picture


class ImageShapeSerializer(serializers.Serializer):
    min_score = serializers.FloatField(default=0.5)
    detected_image = serializers.CharField()
    num_shapes = serializers.IntegerField()
    num_displayed_shapes = serializers.IntegerField()
    analyze_images = serializers.ListField(child=serializers.CharField())


class PictureViewSerializer(serializers.ModelSerializer):
    class Meta:
        model = Picture
        fields = ('id', 'picture', 'name', 'year',
                  'height', 'width', 'collection', 'link')


class PredictionViewSerializer(serializers.ModelSerializer):
    class Meta:
        model = Prediction
        fields = ('input', 'output', 'created_at')


class PredictionSerializer(serializers.Serializer):
    input1 = serializers.FloatField(required=True)


class ReactSerializer(serializers.ModelSerializer):
    class Meta:
        model = Post
        fields = ('id', 'title', 'slug', 'body')


class PostSerializer(serializers.ModelSerializer):
    created = serializers.ReadOnlyField()
    updated = serializers.ReadOnlyField()

    class Meta:
        model = Post
        fields = ('id', 'title', 'slug', 'body', 'publish',
                  'created', 'updated', 'completed')


class CreatePostSerializer(serializers.ModelSerializer):
    class Meta:
        model = Post
        fields = ('title', 'slug', 'body')


class PostTogglePublishSerializer(serializers.ModelSerializer):
    class Meta:
        model = Post
        fields = ['id']
        read_only_fields = ['title', 'created', 'updated', 'completed']
