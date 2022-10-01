from curses.ascii import isblank
import re
from rest_framework import serializers, exceptions
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth import get_user_model, authenticate
from django.core.validators import EmailValidator
from rest_framework.validators import UniqueValidator
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer

from .serializer import *
from .models import *



class CustomUserSerializer(serializers.Serializer):

    username = serializers.CharField(
        max_length=50,
        required=True,
        allow_blank=False,
        validators=[UniqueValidator(queryset=get_user_model().objects.all(), 
                            message='Podana nazwa użytkownika już istnieje.')],
        error_messages={
            'blank': 'Pole z nazwą użytkownika nie może być puste ani zawierać spacji.',
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
            'blank': 'Pole z adresem e-mail nie może być puste ani zawierać spacji.',
            'max_length': 'Poprawny adres e-mail powinien być krótszy niż 150 znaków.'
        }
    )

    password = serializers.CharField(
        write_only=True,
        required=True,
        allow_blank=False,
        style={'input_type': 'password'},
        error_messages={
            'blank': 'Pole z hasłem nie może być puste ani zawierać spacji.',
            'max_length': 'Hasło może zawierać maksymalnie 128 znaków.',
            'min_length': 'Hasło musi mieć co najmniej 5 znaków.'
        }
    )

    password2 = serializers.CharField(
        write_only=True,
        style={'input_type': 'password'},
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
            raise serializers.ValidationError({'password2':'Wprowadzono inne hasło niż podane wcześniej.'})
        return data

    def create(self, validated_data):        
        user = CustomUser(
            username=validated_data['username'],
            email=validated_data['email'])
        user.set_password(validated_data['password'])
        user.save()
        return user



# based on TokenObtainSerializer class methods
class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):

    def validate(self, attrs):
        authenticate_kwargs = {
            self.username_field: attrs[self.username_field],
            'password': attrs['password']
        }

        try:
            authenticate_kwargs['request'] = self.context['request']
        except KeyError:
            pass

        try:
            user = CustomUser.objects.get(username=authenticate_kwargs[self.username_field])
            if not user.is_active:
                self.error_messages['no_active_account']='Użytkownik jest nieaktywny.'
                raise exceptions.AuthenticationFailed(
                    self.error_messages['no_active_account'],
                    'no_active_account',
                )
        except CustomUser.DoesNotExist:
            self.error_messages['no_active_account']='Użytkownik nie istnieje.'
            raise exceptions.AuthenticationFailed(
                self.error_messages['no_active_account'],
                'no_active_account',
            )

        self.user = authenticate(**authenticate_kwargs)

        if self.user is None:
            self.error_messages['no_active_account']='Wprowadzono niepoprawne hasło.'
            raise exceptions.AuthenticationFailed(
                self.error_messages['no_active_account'],
                'no_active_account',
            )

        return [super().validate(attrs), self.user.pk]



"""
Serializer for updating user profile. 
Allows to change username, email, first name, image(to add).
"""
class CustomUserChangeSerializer(serializers.Serializer):

    username = serializers.CharField(
        max_length=50,
        required=False,
        allow_blank=True,
        validators=[UniqueValidator(queryset=get_user_model().objects.all(), 
                            message='Podana nazwa użytkownika już istnieje.')],
        error_messages={
            'max_length': 'Nazwa użytkownika może mieć maksymalnie 50 znaków.'
        }
    )

    email = serializers.EmailField(
        max_length=150,
        required=False,
        allow_blank=True,
        validators=[EmailValidator(message='Wprowadzono niepoprawny adres e-mail.'),
                        UniqueValidator(queryset=get_user_model().objects.all(), message='Podany adres e-mail już istnieje.')],
        error_messages={
            'max_length': 'Poprawny adres e-mail powinien być krótszy niż 150 znaków.'
        }
    )

    first_name = serializers.CharField(
        max_length=50,
        required=False, 
        allow_blank=True
        )


    class Meta:
        model = CustomUser
        fields = ('username', 'email', 'first_name') # add image
        optional_fields = ('username', 'email', 'first_name', )

    def validate_username(self, value):
        pattern = re.compile('^[a-zA-Z0-9_]*$')
        if not pattern.match(value):
            raise serializers.ValidationError('Wprowadzono niepoprawną nazwę użytkownika.')
        return value


    def update(self, instance, validated_data):
        user = self.context['request'].user

        if user.pk != instance.pk:
            raise serializers.ValidationError('Nie masz uprawnień do zmiany danych tego użytkownika.')

        if validated_data['username']:
            instance.username = validated_data.get('username', instance.username)
        
        if validated_data['email']:
            instance.email = validated_data.get('email', instance.email)
        
        if validated_data['first_name']:
            instance.first_name = validated_data.get('first_name', instance.first_name)

        instance.save()
        return instance



"""
Serializer for updating user password.
User firstly should provide old password, new password and then confirm it.
"""
class CustomUserChangePasswordSerializer(serializers.Serializer):

    old_password = serializers.CharField(
        write_only=True,
        required=True,
        style={'input_type': 'password'},
        error_messages={
            'blank': 'Należy podać hasło, które chce się zmienić.',
        }
    )

    new_password = serializers.CharField(
        write_only=True,
        required=True,
        style={'input_type': 'password'},
        error_messages={
            'blank': 'Należy podać nowe hasło.',
            'max_length': 'Hasło może zawierać maksymalnie 128 znaków.',
            'min_length': 'Hasło musi zawierać co najmniej 5 znaków.'
        }
    )

    new_password2 = serializers.CharField(
        write_only=True,
        required=True,
        style={'input_type': 'password'},
        error_messages={
            'blank': 'Należy potwierdzić nowe hasło.'
        }
    )

    class Meta:
        model = CustomUser
        fields = ('old_password', 'new_password', 'new_password2')


    def validate_old_password(self, value):
        user = self.context['request'].user
        if not user.check_password(value):
            raise serializers.ValidationError('Wprowadzone stare hasło jest niepoprawne.')
        return value

    def validate_new_password(self, value):
        if not any(ch.isdigit() for ch in value):
            raise serializers.ValidationError('Hasło musi zawierać przynajmniej 1 liczbę.')
        return value

    def validate(self, attrs):
        if attrs['new_password'] != attrs['new_password2']:
            raise serializers.ValidationError({'new_password2': 'Należy podać te same hasła.'})
        return attrs

    def update(self, instance, validated_data):
        instance.set_password(validated_data['new_password'])
        instance.save()

        return instance
    
