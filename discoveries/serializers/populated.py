from .common import DiscoverySerializer
from comments.serializers.populated import PopulatedCommentSerializer
from categories.serializers.populated import PopulatedCategorySerializer

class PopulatedDiscoverSerializer(DiscoverySerializer):
    comments = PopulatedCommentSerializer(many=True)
    categories = PopulatedCategorySerializer(many=True)