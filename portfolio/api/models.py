from django.db import models
from django.utils import timezone
from django.contrib.auth.models import User
from django.utils.translation import gettext as _

# Create your models here.


class Post(models.Model):
    title = models.CharField(max_length=250)
    slug = models.SlugField(max_length=250)

    body = models.TextField()
    publish = models.DateTimeField(default=timezone.now)
    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)
    completed = models.BooleanField(default=False)
    user = models.ForeignKey(User, on_delete=models.CASCADE)

    class Meta:
        ordering = ['-publish']
        indexes = [models.Index(fields=['-publish']),
                   ]

    def __str__(self):
        return self.title


class Prediction(models.Model):
    input = models.FloatField()
    output = models.FloatField()
    created_at = models.DateTimeField(auto_now_add=True)


class Picture(models.Model):
    id = models.IntegerField(_("id"))
    picture = models.IntegerField(_("picture"), primary_key=True)
    name = models.CharField(_("name"), max_length=200)
    year = models.CharField(_("year"), max_length=200)
    height = models.FloatField(_("height"), max_length=200)
    width = models.FloatField(_("width"), max_length=200)
    collection = models.CharField(_("collection"), max_length=200)
    link = models.CharField(_("link"), max_length=200)

    def __str__(self):
        return f"{self.picture} {self.name}"


class Region(models.Model):
    picture = models.ForeignKey(Picture, on_delete=models.CASCADE)
    num_of_detected_shapes = models.IntegerField(
        _("num of detected_shapes"))
    thresh = models.FloatField(_("thresh"), max_length=200)
    num_of_displayed_shapes = models.IntegerField(
        _("num of displayed_shapes"))
    region = models.IntegerField(_("region"))
    class_of_object = models.CharField(_("class of object"), max_length=200)
    score = models.FloatField(_("score"), max_length=200)
    color = models.CharField(_("color"), max_length=200)
    r = models.FloatField(_("r"), max_length=200)
    g = models.FloatField(_("g"), max_length=200)
    b = models.FloatField(_("b"), max_length=200)
    max_horizontal_pixels = models.IntegerField(
        _("max horizontal pixels"))
    max_vertical_pixels = models.IntegerField(
        _("max vertical pixels"))
    region_surface = models.FloatField(_("region surface"), max_length=200)

    def __str__(self):
        return f"{self.picture} {self.region} {self.class_of_object}"
