from django.db import models
from django.contrib.auth.models import User
from MedMagazine.backends import FileValidator

# Create your models here.
class ArticleStatus(models.Model):
    name = models.CharField(max_length=150, unique=True, blank=False)

    class Meta:
        verbose_name_plural = "Article Statuses"

    def __str__(self):
        return self.name

class Article(models.Model):
    name = models.CharField(max_length=200)
    theme = models.CharField(max_length=200)
    description = models.CharField(max_length=200, blank=False)
    content = models.FileField(upload_to='pdf/', validators=[FileValidator(max_size=24*1024*1024, allowed_extensions=('pdf',))])
    date = models.DateTimeField(auto_now_add=True)
    author = models.ForeignKey(User,on_delete=models.NOT_PROVIDED)
    reviewers = models.ManyToManyField(User,related_name='reviewers',blank=True)
    status = models.ForeignKey(ArticleStatus, on_delete=models.NOT_PROVIDED,default=1)

    def __str__(self):
        return self.name


class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, primary_key=True, parent_link=True)
    patronymic = models.CharField(max_length=100, default='Not Provided')
    company = models.CharField(max_length=200, default='Not Provided')
    phone = models.CharField(max_length=20, default='Not Provided')
    articles = models.ManyToManyField(Article, blank=True)

class Comment(models.Model):
    user = models.ForeignKey(User,models.CASCADE)
    article = models.ForeignKey(Article, models.CASCADE)
    text = models.TextField()
    date = models.DateTimeField(auto_now_add=True)

