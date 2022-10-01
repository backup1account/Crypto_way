from rest_framework.routers import SimpleRouter
from django.urls import path
from rest_framework_simplejwt.views import TokenRefreshView

from .views import *


accounts_router = SimpleRouter()
accounts_router.register(r'register', CustomUserViewSet, basename='register-user')
urlpatterns = accounts_router.urls

urlpatterns += [
    path('obtain-token/', CustomTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('refresh-token/', TokenRefreshView.as_view(), name='token_refresh'),
    path('update-user/<int:pk>/', CustomUserChangeView.as_view(), name='update-user'),
    path('update-password/<int:pk>/', CustomUserChangePasswordView.as_view(), name='update-password'),
]
