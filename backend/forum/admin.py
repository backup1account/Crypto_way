from django.contrib import admin

from .models import Discussion, Comment
from .forms import *

admin.site.register(Comment)

@admin.register(Discussion)
class DiscussionAdmin(admin.ModelAdmin):
    form = DiscussionForm
    readonly_fields = ('link',)
    list_display = ('id', 'author', 'topic', 'link', 'likes',)
