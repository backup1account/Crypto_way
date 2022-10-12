from django.contrib import admin
from django.contrib.auth.admin import UserAdmin

from .forms import CustomUserCreationForm, CustomUserChangeForm
from .models import CustomUser



@admin.register(CustomUser)
class CustomUserAdmin(UserAdmin):
    add_form = CustomUserCreationForm
    form = CustomUserChangeForm

    add_fieldsets = UserAdmin.add_fieldsets + (
        ('Additional information', { 'fields': ('email', 'first_name', 'image',) }),
        ('Permissions & roles', { 'fields': ('is_active', 'is_staff', 'is_superuser', 'user_permissions',) }),
        ('Groups', { 'fields': ('groups',) }),
    )

    fieldsets = (
        ('Basic information', { 'fields': ('username', 'email', 'first_name', 'image',) }),
        ('Password changing', { 'fields': ('password',) }),
        ('Permissions & roles', { 'fields': ('is_active', 'is_staff', 'is_superuser', 'user_permissions',) }),
        ('Groups', { 'fields': ('groups',) }),
    )

    model = CustomUser
    list_display = ('username', 'email', 'first_name', 'is_staff', 'is_active')

