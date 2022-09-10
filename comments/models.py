from django.db import models

# Create your models here.
class Comment(models.Model):
    text = models.TextField(max_length=280)
    created_at = models.DateTimeField(auto_now_add=True)
    discovery = models.ForeignKey(
      "discoveries.discovery",
      related_name="comments",
      on_delete = models.CASCADE
    )