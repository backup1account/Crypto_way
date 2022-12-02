from django.contrib.auth import get_user_model
from rest_framework.generics import CreateAPIView, UpdateAPIView, RetrieveAPIView
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework.parsers import MultiPartParser, FormParser

from .serializer import *


class UserInfoView(RetrieveAPIView):
    queryset = get_user_model().objects.all()
    serializer_class = UserSerializer


class CustomUserRegisterView(CreateAPIView):
    queryset = get_user_model().objects.all()
    serializer_class = CustomUserRegisterSerializer
    permission_classes = [AllowAny]


class CustomTokenObtainPairView(TokenObtainPairView):
    queryset = get_user_model().objects.all()
    serializer_class = CustomTokenObtainPairSerializer


class CustomUserChangeView(UpdateAPIView):
    queryset = get_user_model().objects.all()
    serializer_class = CustomUserChangeSerializer
    parser_classes = (MultiPartParser, FormParser)
    permission_classes = [IsAuthenticated]


class CustomUserChangePasswordView(UpdateAPIView):
    queryset = get_user_model().objects.all()
    serializer_class = CustomUserChangePasswordSerializer
    permission_classes = [IsAuthenticated]
