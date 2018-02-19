from rest_framework import serializers
from .models import Article

# Serializers define the API representation.
class ArticleSerializer(serializers.ModelSerializer):
    class Meta:
        model = Article
        fields = '__all__'
