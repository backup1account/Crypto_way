from django.contrib.auth import get_user_model
from rest_framework.generics import CreateAPIView, UpdateAPIView
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework_simplejwt.views import TokenObtainPairView

from .serializer import *


# @csrf_exempt ?
class CustomUserRegisterView(CreateAPIView):
    queryset = get_user_model().objects.all()
    serializer_class = CustomUserSerializer
    permission_classes = [AllowAny]



class CustomTokenObtainPairView(TokenObtainPairView):
    queryset = get_user_model().objects.all()
    serializer_class = CustomTokenObtainPairSerializer



class CustomUserChangeView(UpdateAPIView):
    queryset = get_user_model().objects.all()
    serializer_class = CustomUserChangeSerializer
    permission_classes = [IsAuthenticated]



class CustomUserChangePasswordView(UpdateAPIView):
    queryset = get_user_model().objects.all()
    serializer_class = CustomUserChangePasswordSerializer
    permission_classes = [IsAuthenticated]

