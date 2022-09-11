from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

from .serializers.populated import PopulatedTagSerializer
from .models import Tag

# Create your views here.
class TagListView(APIView):
    
    def get(self, _request):
        tags = Tag.objects.all()
        serialized_tags = PopulatedTagSerializer(tags, many=True)
        print(serialized_tags.data)
        return Response(serialized_tags.data)
