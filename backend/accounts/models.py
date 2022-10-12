import os
from django.conf import settings
from django.db import models
from django.contrib.auth.models import AbstractUser, UserManager

from django.core.validators import RegexValidator
from django_resized import ResizedImageField


def upload_profile_pic(instance, filename):
    filebase, extension = filename.split('.')
    img_name = 'profile_pictures/%s.%s' % (instance.pk, extension) # with upper folder
    full_img_path = os.path.join(settings.MEDIA_ROOT, img_name)
    if os.path.exists(full_img_path):
        os.remove(full_img_path)
    return img_name


class CustomUser(AbstractUser):
    username = models.CharField(max_length=50, unique=True, blank=False, null=False, 
            validators=[RegexValidator('^[a-zA-Z0-9_]*$', "Username can only contain alphanumeric characters and _.")])
    email = models.EmailField(max_length=150, unique=True, null=False, blank=False)
    password = models.CharField(max_length=128, blank=False, null=False)

    first_name = models.CharField(max_length=50, null=True, blank=False)
    image = ResizedImageField(size=[300, 300], default='default.jpg', upload_to=upload_profile_pic)

    objects = UserManager()

    def __str__(self):
        return self.username
