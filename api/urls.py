from django.urls import path
from .views import UserViewSet
urlpatterns = [
    path('get-user/', UserViewSet.as_view({'get': 'list'})),
]
