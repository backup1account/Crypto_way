from rest_framework import serializers
from rest_framework_simplejwt.tokens import RefreshToken

from .models import *



class RegisterUserSerializer(serializers.ModelSerializer):
    tokens = serializers.SerializerMethodField()
    password = serializers.CharField(
        write_only=True,
        required=True,
        style={'input_type': 'password'}
    )

    class Meta:
        model = CustomUser
        fields = ('username', 'email', 'password', 'tokens')


    def get_tokens(self, user):
        tokens = RefreshToken.for_user(user)
        refresh_token = str(tokens)
        access_token = str(tokens.access_token)
        data = {
            'refresh': refresh_token,
            'access': access_token
        }
        return data

    def create(self, validated_data):
        user = CustomUser(
            username=validated_data['username'],
            email=validated_data['email'])
        user.set_password(validated_data['password'])
        user.save()
        return user
