from django.contrib import admin
from .models import Profile
from django.contrib.admin.models import models

# Register your models here.
class ProfileAdmin(admin.ModelAdmin):
    list_display = ('patronymic', 'company', 'phone',)

admin.site.register(Profile, ProfileAdmin)
