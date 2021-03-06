from django.db import models
from django.contrib.auth.models import User
from MedMagazine.backends import FileValidator
import datetime

class ArticleStatus(models.Model):
    name = models.CharField(max_length=150, unique=True, blank=False)

    class Meta:
        verbose_name_plural = "Article Statuses"

    def __str__(self):
        return self.name

class ArticleStage(models.Model):
    name = models.CharField(max_length=150, unique=True, blank=False)
    statuses_id = models.ManyToManyField(ArticleStatus)

    class Meta:
        verbose_name_plural = "Article Stages"

    def __str__(self):
        return self.name 

class Language(models.Model):
    language = models.CharField(max_length=200, primary_key=True, unique = True)

class ArticleTheme(models.Model):
    theme = models.CharField(max_length=200, primary_key=True, unique = True)

class Article(models.Model):
    name = models.CharField(max_length=200)
    theme = models.ForeignKey(ArticleTheme, on_delete=models.NOT_PROVIDED)
    description = models.CharField(max_length=3000)
    content = models.FileField(upload_to='pdf/')
    language = models.ForeignKey(Language, on_delete=models.NOT_PROVIDED)
    udc = models.CharField(max_length=3000)
    key_words = models.CharField(max_length=3000)
    date = models.DateTimeField(auto_now_add=True)
    author = models.ForeignKey(User,on_delete=models.NOT_PROVIDED)
    collaborators = models.TextField()
    reviewers = models.ManyToManyField(User,related_name='reviewers',blank=True)
    status = models.ForeignKey(ArticleStatus, on_delete=models.NOT_PROVIDED,default=1)
    stage = models.ForeignKey(ArticleStage,on_delete=models.NOT_PROVIDED, default=1)
    number = models.IntegerField(default = 0)
    can_edit = models.BooleanField(default=True)
    deleted = models.BooleanField(default = False)

    # def getAuthorName(self):
    #     return "Hello"

class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, primary_key=True, parent_link=True)
    patronymic = models.CharField(max_length=100, default='Not Provided')
    position = models.CharField(max_length=200, default='Not Provided')
    grade = models.CharField(max_length=200, default='Not Provided', blank=True)
    company = models.CharField(max_length=200, default='Not Provided')
    phone = models.CharField(max_length=20, default='Not Provided')
    articles = models.ManyToManyField(Article, blank=True)

class Comment(models.Model):
    user = models.ForeignKey(User,models.CASCADE)
    article = models.ForeignKey(Article, models.CASCADE)
    text = models.TextField()
    date = models.DateTimeField(auto_now_add=True)

class JournalManager(models.Manager):
    def create_journal(self,articles):
        theme = ArticleTheme.objects.get(theme='it')
        journal = self.create(theme=theme)
        for article in articles:
            journal.articles.add(article)
        return journal

class Journal(models.Model):
    articles = models.ManyToManyField(Article)
    date = models.DateTimeField(auto_now_add=True)
    name = models.CharField(max_length=200,default = 'Журнал %s' % datetime.datetime.now())
    theme = models.ForeignKey(ArticleTheme,on_delete=models.NOT_PROVIDED)
    
    objects = JournalManager()

