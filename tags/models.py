from pickle import FALSE
from django.db import models
# Create your models here.    

class Tag(models.Model):
    discovery = models.ForeignKey(
        "discoveries.Discovery",
        related_name="tag",
        on_delete=models.CASCADE
    )
    tagged = models.BooleanField(default=True),  
    created_at = models.DateTimeField(auto_now_add=True)
    owner = models.ForeignKey(
        "jwt_auth.User",
        related_name="tag",
        on_delete=models.CASCADE
    )

    def __str__(self):
        return f"At {self.created_at} I Liked {self.discovery}"


