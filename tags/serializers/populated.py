from .common import TagSerializer
from discoveries.serializers.common import DiscoverySerializer

class PopulatedTagSerializer(TagSerializer):
  discoveries = DiscoverySerializer(many=True)