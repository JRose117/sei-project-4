from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.exceptions import NotFound

from .serializers.populated import TagSerializer
from .models import Tag

# Create your views here.
class TagListView(APIView):

    def post(self, request):
        tag_to_add = TagSerializer(data=request.data)
        try:
            tag_to_add.is_valid(True)
            tag_to_add.save()
            
            return Response(tag_to_add.data, status=status.HTTP_201_CREATED)
        except Exception as e:
            print('ERROR')
            return Response(e.__dict__ if e.__dict__ else str(e), status=status.HTTP_422_UNPROCESSABLE_ENTITY)


    def get(self, _request):
      tags = Tag.objects.all()
      serialized_tags = TagSerializer(tags, many=True)
      return Response(serialized_tags.data, status=status.HTTP_200_OK)

class TagDetailView(APIView):

    def get_tag(self, pk):
        try:
            return Tag.objects.get(pk=pk)
        except Tag.DoesNotExist:
            raise NotFound(detail="Tag not found")

    def delete(self, request, pk):
        tag_to_delete = self.get_tag(pk=pk)
        tag_to_delete.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)