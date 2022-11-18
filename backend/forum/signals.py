from django.db.models.signals import post_save
from django.dispatch import receiver

from .models import *

@receiver(post_save, sender=Discussion, dispatch_uid="update_url_field")
def update_url(sender, instance, **kwargs):
    if instance.id is None:
        pass
    else:
        Discussion.objects.filter(id=instance.id).update(link=instance.set_discussion_link(instance.id))
        post_save.connect(update_url, sender=Discussion)
