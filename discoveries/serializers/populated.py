from .common import DiscoverySerializer
from comments.serializers.common import CommentSerializer

class PopulatedDiscoverSerializer(DiscoverySerializer):
    comments = CommentSerializer(many=True)