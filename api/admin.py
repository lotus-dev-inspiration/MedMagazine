from django.contrib import admin
from .models import Profile
from .models import Article,ArticleStatus
from django.contrib.admin.models import models

# Register your models here.
class ProfileAdmin(admin.ModelAdmin):
    list_display = ('patronymic', 'company', 'phone',)

class ArticleAdmin(admin.ModelAdmin):
    list_display = ('name','theme','author','status','date')
    list_filter = ('date', 'status','theme')

admin.site.register(Profile, ProfileAdmin)
admin.site.register(ArticleStatus)
admin.site.register(Article,ArticleAdmin)
