from django.db import models
from django.contrib.auth.models import AbstractUser, UserManager

from django.core.validators import RegexValidator
from .validators import *



class CustomUser(AbstractUser):
    username = models.CharField(max_length=50, unique=True, blank=False, null=False, 
            validators=[RegexValidator('^[a-zA-Z0-9_]*$', "Username can only contain alphanumeric characters.")])
    email = models.EmailField(max_length=150, unique=True, null=False, blank=False)
    password = models.CharField(max_length=128, blank=False, null=False, validators=[validate_password])

    first_name = models.CharField(max_length=50) # Blank=False ?

    # avatar = models.ImageField(Default=) -> jak ustawic ten szajs defaultowy a potem opcje zxmienic dodac trzeba

    objects = UserManager()

    def __str__(self):
        return self.username

