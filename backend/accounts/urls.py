from rest_framework.routers import SimpleRouter
from django.urls import path
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

from .views import *


accounts_router = SimpleRouter()
accounts_router.register('register', RegisterUserViewSet, basename='register-user')
urlpatterns = accounts_router.urls

urlpatterns += [
    path('obtain-token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('refresh-token/', TokenRefreshView.as_view(), name='token_refresh'),
]
