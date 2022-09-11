from .common import CategorySerializer
from discoveries.serializers.common import DiscoverySerializer

class PopulatedCategorySerializer(CategorySerializer):
    discoveries = DiscoverySerializer(many=True)