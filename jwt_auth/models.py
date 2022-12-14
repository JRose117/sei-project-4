from django.db import models
from django.contrib.auth.models import AbstractUser

# Create your models here.

class User(AbstractUser):
    username = models.CharField(max_length = 50, unique=True) 
    email = models.CharField(max_length = 100, unique=True)
    profilePicture = models.CharField(max_length=200, blank=True, default = '')
    