from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.exceptions import NotFound, PermissionDenied
from rest_framework.permissions import IsAuthenticatedOrReadOnly
from .serializers.common import CommentSerializer
from .models import Comment

class CommentListView(APIView):

  def get(self, _request):
      comments = Comment.objects.all()
      serialized_comments = CommentSerializer(comments, many=True)
      return Response(serialized_comments.data, status=status.HTTP_200_OK)

  def post(self, request):
    comment_to_create = CommentSerializer(data=request.data)
    try:
      comment_to_create.is_valid(True)
      comment_to_create.save()
      return Response(comment_to_create.data, status=status.HTTP_201_CREATED)
    except Exception as e:
      return Response(e.__dict__ if e.__dict__ else str(e), status=status.HTTP_422_UNPROCESSABLE_ENTITY)

class CommentDetailView(APIView):
  permission_classes = (IsAuthenticatedOrReadOnly, )
  def get_comment(self, pk):
    try:
      return Comment.objects.get(pk=pk)
    except Comment.DoesNotExist:
      raise NotFound("Comment not found")
    
  def put(self, request, pk):
    comment_to_update = self.get_comment(pk=pk) 
    updated_comment = CommentSerializer(comment_to_update, data=request.data) 
    try:
        updated_comment.is_valid(True) 
        updated_comment.save()
        return Response(updated_comment.data, status=status.HTTP_202_ACCEPTED)
    except Exception as error:
        print(error)
        return Response(str(error), status=status.HTTP_422_UNPROCESSABLE_ENTITY)

  def delete(self, request, pk):
    comment_to_delete = self.get_comment(pk)
    if comment_to_delete.owner != request.user or request.user.is_superuser:
      raise PermissionDenied("Not Authorised to Delete")
    comment_to_delete = self.get_comment(pk)
    comment_to_delete.delete()
    return Response(status=status.HTTP_204_NO_CONTENT)

  