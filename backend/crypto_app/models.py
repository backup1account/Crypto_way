from django.db import models
from django.core.validators import EmailValidator

# def validate_password(value):


class AppUser(models.Model):
    username = models.CharField(max_length=30)
    password = models.CharField(max_length=30)
    email = models.CharField(max_length=50, validators=[EmailValidator])
    # birth = models.DateTimeField()

    def __str__(self) -> str:
        return self.username

