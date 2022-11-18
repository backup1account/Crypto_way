from rest_framework import viewsets

from .serializer import *
from .models import Discussion

class DiscussionViewSet(viewsets.ModelViewSet):
    serializer_class = DiscussionSerializer
    queryset = Discussion.objects.all()
