from pickle import FALSE
from django.db import models
# Create your models here.
class Tag(models.Model):
    tagged = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    # tagged_by = models.ForeignKey(
    #   'jwt_auth.User',
    #   related_name='tags',
    #   on_delete=models.CASCADE,
    #   default = '1'
    # )
    discoveries = models.ManyToManyField(
      "discoveries.Discovery",
      related_name="tags"
    )

    def __str__(self):
      return f"{self.tagged} - {self.created_at}"


