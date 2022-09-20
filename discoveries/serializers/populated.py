from .common import DiscoverySerializer
from comments.serializers.populated import PopulatedCommentSerializer
from categories.serializers.populated import PopulatedCategorySerializer
# from tags.serializers.common import TagSerializer
from jwt_auth.serializers.common import UserSerializer

class PopulatedDiscoverSerializer(DiscoverySerializer):
    comments = PopulatedCommentSerializer(many=True)
    categories = PopulatedCategorySerializer(many=True)
    owner = UserSerializer()

class PopulatedCommentDiscoverySerializer(DiscoverySerializer):
    comments = PopulatedCommentSerializer
    
