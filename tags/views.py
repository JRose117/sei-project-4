from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated


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

