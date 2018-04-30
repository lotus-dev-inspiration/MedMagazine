from django.contrib import admin
from .models import Article,ArticleStatus, Language, ArticleTheme, Profile

# Register your models here.
class ProfileAdmin(admin.ModelAdmin):
    list_display = ('patronymic', 'company', 'phone',)

class ArticleAdmin(admin.ModelAdmin):
    list_display = ('name','theme','author','status','date')
    list_filter = ('date','theme', 'status',)

class ArticleStatusAdmin(admin.ModelAdmin):
    list_filter = ('name',)

admin.site.register(Profile, ProfileAdmin)
admin.site.register(ArticleStatus, ArticleStatusAdmin)
admin.site.register(Article,ArticleAdmin)
admin.site.register(Language)
admin.site.register(ArticleTheme)
