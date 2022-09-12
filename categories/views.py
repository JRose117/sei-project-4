from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.exceptions import NotFound, PermissionDenied
from rest_framework.permissions import IsAuthenticatedOrReadOnly
from .serializers.common import CategorySerializer
from .serializers.populated import PopulatedCategorySerializer
from .models import Category

class CategoryListView(APIView):

  def get(self, _request):
      categories = Category.objects.all()
      serialized_categories = CategorySerializer(categories, many=True)
      return Response(serialized_categories.data, status=status.HTTP_200_OK)

  def post(self, request):
    category_to_create = CategorySerializer(data=request.data)
    try:
      category_to_create.is_valid(True)
      category_to_create.save()
      return Response(category_to_create.data, status=status.HTTP_201_CREATED)
    except Exception as e:
      return Response(e.__dict__ if e.__dict__ else str(e), status=status.HTTP_422_UNPROCESSABLE_ENTITY)

class CategoryDetailView(APIView):
  permission_classes = (IsAuthenticatedOrReadOnly, )
  def get_category(self, pk):
    try:
      return Category.objects.get(pk=pk)
    except Category.DoesNotExist:
      raise NotFound("Category not found")

  def get(self, _request, pk):
    category = self.get_category(pk=pk) 
    serialized_category = PopulatedCategorySerializer(category)
    return Response(serialized_category.data, status=status.HTTP_200_OK)

  def put(self, request, pk):
    category_to_update = self.get_category(pk=pk) 
    updated_category = CategorySerializer(category_to_update, data=request.data) 
    try:
        updated_category.is_valid(True) 
        updated_category.save()
        return Response(updated_category.data, status=status.HTTP_202_ACCEPTED)
    except Exception as error:
        print(error)
        return Response(str(error), status=status.HTTP_422_UNPROCESSABLE_ENTITY)

  def delete(self, request, pk):
    category_to_delete = self.get_category(pk)
    if category_to_delete.owner != request.user or request.user.is_superuser:
      raise PermissionDenied("Not Authorised to Delete")
    category_to_delete = self.get_category(pk)
    category_to_delete.delete()
    return Response(status=status.HTTP_204_NO_CONTENT)

  