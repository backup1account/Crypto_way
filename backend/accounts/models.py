from django.db import models
from django.contrib.auth.models import AbstractUser, UserManager

from django.core.validators import RegexValidator



class CustomUser(AbstractUser):
    username = models.CharField(max_length=50, unique=True, blank=False, null=False, 
            validators=[RegexValidator('^[a-zA-Z0-9_]*$', "Username can only contain alphanumeric characters and _.")])
    email = models.EmailField(max_length=150, unique=True, null=False, blank=False)
    password = models.CharField(max_length=128, blank=False, null=False)

    first_name = models.CharField(max_length=50, null=True, blank=False)

    # avatar = models.ImageField(Default=) -> jak ustawic ten szajs defaultowy a potem opcje zxmienic dodac trzeba

    objects = UserManager()

    def __str__(self):
        return self.username

