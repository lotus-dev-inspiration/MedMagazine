from django.contrib import admin
from django.contrib.auth.models import User

from .models import CustomUser


# Register your models here.
admin.site.unregister(User)
admin.site.register(CustomUser)