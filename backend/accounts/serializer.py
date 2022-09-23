import re
from rest_framework import serializers
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth import get_user_model
from django.core.validators import EmailValidator
from rest_framework.validators import UniqueValidator
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer

from .models import *



class RegisterUserSerializer(serializers.Serializer):

    username = serializers.CharField(
        max_length=50,
        required=True,
        allow_blank=False,
        validators=[UniqueValidator(queryset=get_user_model().objects.all(), 
                            message='Podana nazwa użytkownika już istnieje.')],
        error_messages={
            'blank': 'Pole z nazwą użytkownika nie może być puste.',
            'max_length': 'Nazwa użytkownika może mieć maksymalnie 50 znaków.'
        }
    )

    email = serializers.EmailField(
        max_length=150,
        required=True,
        allow_blank=False,
        validators=[EmailValidator(message='Wprowadzono niepoprawny adres e-mail.'),
                        UniqueValidator(queryset=get_user_model().objects.all(), message='Podany adres e-mail już istnieje.')],
        error_messages={
            'blank': 'Pole z adresem e-mail nie może być puste.',
            'max_length': 'Poprawny adres e-mail powinien być krótszy niż 150 znaków.'
        }
    )

    password = serializers.CharField(
        max_length=128,
        min_length=5,
        write_only=True,
        required=True,
        allow_blank=False,
        style={'input_type': 'password'},
        error_messages={
            'blank': 'Pole z hasłem nie może być puste.',
            'max_length': 'Hasło może mieć maksymalnie 128 znaków.',
            'min_length': 'Hasło musi mieć co najmniej 5 znaków.'
        }
    )

    password2 = serializers.CharField(
        write_only=True,
        style= {'input_type': 'password'},
        label='Confirm password',
        error_messages={
            'blank': 'Należy wprowadzić ponownie hasło.',
        }
    )

    tokens = serializers.SerializerMethodField()


    class Meta:
        model = CustomUser
        fields = ('username', 'email', 'password', 'password2', 'tokens')


    def get_tokens(self, user):
        tokens = RefreshToken.for_user(user)
        refresh_token = str(tokens)
        access_token = str(tokens.access_token)
        data = {
            'refresh': refresh_token,
            'access': access_token
        }
        return data


    def validate_username(self, value):
        pattern = re.compile('^[a-zA-Z0-9_]*$')
        if not pattern.match(value):
            raise serializers.ValidationError('Wprowadzono niepoprawną nazwę użytkownika.')
        return value


    def validate_password(self, value):
        if not any(ch.isdigit() for ch in value):
            raise serializers.ValidationError('Hasło musi zawierać przynajmniej 1 liczbę.')
        return value


    def validate(self, data):
        if data.get('password') != data.get('password2'):
            raise serializers.ValidationError('Wprowadzono inne hasło niż podane wcześniej.')
        return data


    def create(self, validated_data):        
        user = CustomUser(
            username=validated_data['username'],
            email=validated_data['email'])
        user.set_password(validated_data['password'])
        user.save()
        return user


