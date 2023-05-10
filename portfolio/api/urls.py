from django.urls import path
from .views import PostView, CreatePostView, PostRetrieveUpdateDestroy, PostTogglePublish, PredictView, PictureView, PictureDetailView, predict, stats, detect_shapes

urlpatterns = [
    path('', PostView.as_view()),
    path('post/', PostView.as_view()),
    path('create/', CreatePostView.as_view()),
    path('post/<int:pk>', PostRetrieveUpdateDestroy.as_view()),
    path('post/<int:pk>/publish', PostTogglePublish.as_view()),
    path('pred/', PredictView.as_view()),
    path('picture/', PictureView.as_view()),
    path('picture/<int:picture>/', PictureDetailView.as_view()),
    path('predict/', predict, name='predict'),
    path('stats/', stats, name='stats'),
    path('detect/<int:picture_id>/', detect_shapes, name='detect'),
]
