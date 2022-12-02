from django import forms
from django.contrib.auth.forms import UserCreationForm, UserChangeForm
from django.contrib.auth import get_user_model
from django.core.exceptions import ValidationError

from .models import CustomUser
from django.contrib.auth import get_user_model


class CustomUserCreationForm(UserCreationForm):

    class Meta:
        model = CustomUser
        widgets = { 'password': forms.PasswordInput() }
        fields = ('username', 'email', 'first_name', 'image')


    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.fields['first_name'].required = False
        self.fields['image'].required = False


    def clean_username(self):
        username = self.cleaned_data['username']
        duplicate = get_user_model().objects.filter(username=username)
        if duplicate.count():
            raise ValidationError("Nazwa użytkownika już istnieje.")
        return username

    def clean_email(self):
        email = self.cleaned_data['email']
        duplicate = get_user_model().objects.filter(email=email)
        if duplicate.count():
            raise ValidationError("Email już istnieje.")
        return email

    # def clean_image(self):
    #     image = self.cleaned_data.get('image', None)
    #     if image.height > 480 or image.width > 640:
    #          raise ValidationError("Nieprawidłowe wymiary obrazu. Maksymalne to 640x480.")
    #     return image


    def save(self, commit=True):
        user = super().save(commit=False)
        user.username = self.cleaned_data['username']
        user.password = self.cleaned_data.get('password1')
        user.email = self.cleaned_data['email']

        if commit:
            user.save()
        return user



class CustomUserChangeForm(UserChangeForm):
    class Meta:
        model = CustomUser
        fields = '__all__'

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.fields['first_name'].required = False
        
