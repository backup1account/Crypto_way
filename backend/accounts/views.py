from rest_framework.views import APIView
from .serializer import *

from rest_framework.response import Response
from django.contrib.auth import authenticate, login
from django.contrib.auth import get_user_model


class CustomUserView(APIView):
    def get(self, request):
        output = [{ 
            "id": user.id,
            "username": user.username,
            "email": user.email,
            "is_active": user.is_active
            } for user in get_user_model().objects.all()]

        return Response(output)
    
    def post(self, request):
        serializer = UserSerializer(data=request.data)
        username = request.POST['username']
        email = request.POST['email']
        password = request.POST['password']
