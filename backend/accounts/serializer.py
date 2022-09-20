from rest_framework.serializers import ModelSerializer
from .models import *


class UserSerializer(ModelSerializer):

    class Meta:
        model = CustomUser
        fields = ('username', 'email', 'password')
        extra_kwargs = {'password': { 'write_only': True }}


    def create(self, validated_data):
        user = CustomUser(
            username=validated_data['username'],
            email=validated_data['email'])
        user.set_password(validated_data['password'])
        user.save()
        return user

