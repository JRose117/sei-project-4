from django.db import models

# Create your models here.
class Discovery(models.Model):
    discName = models.CharField(max_length=100)
    discDesc = models.CharField(max_length=280, blank=True, default='')
    discImage = models.ImageField(upload_to='images/', blank=True, default='')
    # created_at = models.DateTimeField(auto_now_add=True)
    categories = models.ManyToManyField(
      "categories.Category", 
      related_name="discoveries"
    )
    tags = models.ManyToManyField(
        'tags.Tag',
        related_name="discoveries",
        blank=True, default = []
    )
    owner = models.ForeignKey(
        'jwt_auth.User',
        related_name='discovery',
        on_delete=models.CASCADE
    )
    def __str__(self):
        return f"{self.discName}"