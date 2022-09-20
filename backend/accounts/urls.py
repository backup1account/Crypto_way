from rest_framework.routers import SimpleRouter

from .views import *


accounts_router = SimpleRouter()
accounts_router.register('register', RegisterUserViewSet, basename='register-user')
accounts_router.register('login', LoginUserViewSet, basename='login-user')
urlpatterns = accounts_router.urls
