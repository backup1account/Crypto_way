from rest_framework.viewsets import ViewSet
from django.contrib.auth import get_user_model
from rest_framework.response import Response
from rest_framework.generics import UpdateAPIView
from rest_framework.decorators import permission_classes
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework import status
from rest_framework_simplejwt.views import TokenObtainPairView

from .serializer import *


# @csrf_exempt ?
class CustomUserViewSet(ViewSet):
    queryset = get_user_model().objects.all()
    serializer_class = CustomUserSerializer
    permission_classes = [AllowAny]

    def create(self, request, *args, **kwargs):
        serializer = CustomUserSerializer(data=request.data)
        if serializer.is_valid():
            self.perform_create(serializer)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)



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

