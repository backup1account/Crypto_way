from rest_framework.viewsets import ModelViewSet
# from rest_framework.decorators import action
from django.contrib.auth import get_user_model

from .serializer import *


# define class which inherits on BasicAuthentication ?


class RegisterUserViewSet(ModelViewSet):
    serializer_class = UserSerializer
    queryset = get_user_model().objects.all()

    # @action -> change_password, change_username, change_email, change_firstname ?
    # change_image later



class LoginUserViewSet(ModelViewSet):
    serializer_class = UserSerializer
    queryset = get_user_model().objects.all()

