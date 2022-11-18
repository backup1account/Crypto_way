from .views import DiscussionViewSet
from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register(r'discussions', DiscussionViewSet, basename='discussion')
urlpatterns = router.urls