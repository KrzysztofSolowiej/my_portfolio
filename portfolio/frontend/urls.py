from django.urls import path
from .views import index

urlpatterns = [
    path('', index),
    path('home/', index),
    path('about/', index),
    path('first-project/', index),
    path('rothko/', index),
    path('modular/', index),
    path('rothko/<int:picture>', index),
]
