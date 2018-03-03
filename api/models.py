from django.db import models
from django.contrib.auth.models import User

# Create your models here.
class ArticleStatus(models.Model):
    name = models.CharField(max_length=150, db_index=True,unique=True, primary_key=True, blank=False)

    class Meta:
        verbose_name_plural = "Article Statuses"

    def __str__(self):
        return self.name

class Article(models.Model):
    name = models.CharField(max_length=200)
    theme = models.CharField(max_length=200)
    description = models.CharField(max_length=200, blank=True)
    content = models.CharField(max_length=200, blank=True)
    date = models.DateTimeField(auto_now_add=True)
    author = models.ForeignKey(User,on_delete=models.CASCADE)
    reviewers = models.ManyToManyField(User,related_name='reviewer')
    status = models.ForeignKey(ArticleStatus, on_delete=models.NOT_PROVIDED)


class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, primary_key=True, parent_link=True)
    patronymic = models.CharField(max_length=100, blank=True)
    company = models.CharField(max_length=200, blank= True)
    phone = models.CharField(max_length=20, blank=True)
    articles = models.ForeignKey(Article, on_delete=models.NOT_PROVIDED)
    

