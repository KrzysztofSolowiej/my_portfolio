from django.contrib import admin
from .models import Post, Prediction, Picture

# Register your models here.
admin.site.register(Post)
admin.site.register(Prediction)
admin.site.register(Picture)
