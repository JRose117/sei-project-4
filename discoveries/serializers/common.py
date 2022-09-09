from http.cookies import BaseCookie
from rest_framework import serializers
from ..models import Discovery

class DiscoverySerializer(serializers.ModelSerializer):
    class Meta:
      model = Discovery
      fields = "__all__"