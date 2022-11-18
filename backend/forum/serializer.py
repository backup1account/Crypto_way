from rest_framework import serializers, exceptions
from .models import *


class DiscussionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Discussion
        fields = '__all__'