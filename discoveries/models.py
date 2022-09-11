from django.db import models

# Create your models here.
class Discovery(models.Model):
    rec_name = models.CharField(max_length=100)
    rec_location = models.CharField(max_length=50, blank=True, default='')
    rec_image = models.CharField(max_length=100, blank=True, default='')
    # created_at = models.DateTimeField(auto_now_add=True)
    categories = models.ManyToManyField(
      "categories.Category", 
      related_name="discoveries"
    )
    def __str__(self):
        return f"{self.rec_name}"