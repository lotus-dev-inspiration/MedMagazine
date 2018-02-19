from django.contrib import admin
from .models import Article,ArticleStatus

# Register your models here.
class ArticleAdmin(admin.ModelAdmin):
    list_display = ('name','theme','author','status','date')
    list_filter = ('date', 'status','theme')


admin.site.register(ArticleStatus)
admin.site.register(Article,ArticleAdmin)
