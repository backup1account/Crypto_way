from django import forms
from .models import *

class DiscussionForm(forms.ModelForm):
    class Meta:
        model = Discussion
        fields = ('author', 'topic', 'description', 'likes',)

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)


# class CommentForm