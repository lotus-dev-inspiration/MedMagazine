from django.db import models
from django.contrib.auth.models import User



# Create your models here.
class CustomUser(User):
    slug = models.SlugField()
    patronimic = models.CharField(max_length=100, blank=True)
    compamy = models.CharField(max_length=200, blank= True)
    #articles = models.ForeignKey(User_Articles)
    phone = models.CharField(max_length=20, blank=True)


