from django.contrib import admin
from .models import Profile
from .models import Article,ArticleStatus


# Register your models here.
class ProfileAdmin(admin.ModelAdmin):
    list_display = ('patronymic', 'company', 'phone',)

class ArticleAdmin(admin.ModelAdmin):
    list_display = ('name','theme','author','status','date')
    list_filter = ('date', 'status','theme',)

class ArticleStatusAdmin(admin.ModelAdmin):
    list_filter = ('name',)

admin.site.register(Profile, ProfileAdmin)
admin.site.register(ArticleStatus, ArticleStatusAdmin)
admin.site.register(Article,ArticleAdmin)
