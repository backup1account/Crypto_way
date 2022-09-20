from django import forms
from django.contrib.auth.forms import UserCreationForm, UserChangeForm
from django.contrib.auth import get_user_model
from django.core.exceptions import ValidationError

from .models import CustomUser
from django.contrib.auth import get_user_model



class CustomUserCreationForm(UserCreationForm):
    password2 = forms.CharField(widget=forms.PasswordInput(), error_messages={
        'required': 'Password needs to be confirmed.'
        }, label='Confirm password')


    class Meta:
        model = CustomUser
        widgets = { 'password': forms.PasswordInput() }
        fields = ('username', 'email', 'first_name')


    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.fields['first_name'].required = False


    def clean_username(self):
        username = self.cleaned_data['username']
        duplicate = get_user_model().objects.filter(username=username)
        if duplicate.count():
            raise ValidationError("Username already exists.")
        return username

    def clean_email(self):
        email = self.cleaned_data['email']
        duplicate = get_user_model().objects.filter(email=email)
        if duplicate.count():
            raise ValidationError("Email already exists.")
        return email


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
        
