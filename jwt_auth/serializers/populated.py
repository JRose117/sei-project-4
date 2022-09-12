from .common import UserSerializer
from tags.serializers.populated import PopulatedTagSerializer

class PopulatedUserSerializer(UserSerializer):
  user_tags = PopulatedTagSerializer(many=True)