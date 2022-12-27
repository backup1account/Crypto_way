from django.conf import settings
from django.db import models
from accounts.models import CustomUser

from django.core.exceptions import ValidationError


class Discussion(models.Model):
    id = models.BigAutoField(primary_key=True)
    author = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    topic = models.CharField(max_length=50, blank=False, null=False)
    description = models.CharField(max_length=1000, blank=True)
    likes = models.IntegerField(default=0)
    link = models.URLField(max_length=100)
    date_created = models.DateTimeField(auto_now_add=True, null=True)
    # tags = models.CharField(max_length=200, blank=True)
    # comments int ?

    # TODO: CHANGE LATER TO 8000 !
    @classmethod
    def set_discussion_link(cls, pk): #instance.id
        discussion_link = 'http://localhost:3000/forum/post-%s' % (pk)

        if Discussion.objects.filter(link=discussion_link):
            found_record = Discussion.objects.get(link=discussion_link)
            previous_record = Discussion.objects.get(id=pk)

            if found_record.author != previous_record.author:
                raise ValidationError("Discussion already exists")

        return discussion_link

    def __str__(self):
        return str(self.topic)


class Comment(models.Model):
    # c_discussion_ref = models.ForeignKey()
    c_author = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.PROTECT)
    c_description = models.CharField(max_length=1000)
    c_link = models.URLField(max_length=100, null=True)

    def __str__(self):
        return str(self.c_author)
