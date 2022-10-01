from django.urls import path
from rest_framework_simplejwt.views import TokenRefreshView

from .views import *


urlpatterns = [
    path('obtain-token/', CustomTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('refresh-token/', TokenRefreshView.as_view(), name='token_refresh'),
    path('update-user/<int:pk>/', CustomUserChangeView.as_view(), name='update-user'),
    path('update-password/<int:pk>/', CustomUserChangePasswordView.as_view(), name='update-password'),
    path('register/', CustomUserRegisterView.as_view(), name='register_user')
]
