from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from rest_framework.exceptions import NotFound, PermissionDenied


from .models import Tag

from .serializers.common import TagSerializer


class TagListView(APIView):
    permission_classes = (IsAuthenticated, )

    def post(self, request):
        request.data['owner'] = request.user.id
        new_tag = TagSerializer(data=request.data)
        if new_tag.is_valid():
            new_tag.save()
            return Response(new_tag.data, status=status.HTTP_201_CREATED)
        return Response(new_tag.errors, status=status.HTTP_422_UNPROCESSABLE_ENTITY)

class TagDetailView(APIView):
    permission_classes = (IsAuthenticated, )

    def get_tag(self, pk):
        try:
            tag = Tag.objects.get(pk=pk)
            return tag
        except Tag.DoesNotExist:
            raise NotFound(detail="🆘 Tag not found")

    def delete(self, request, pk):
        tag_to_delete = self.get_tag(pk=pk)
        if tag_to_delete.owner != request.user:
            raise PermissionDenied(detail="Unauthorised")
        tag_to_delete.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)