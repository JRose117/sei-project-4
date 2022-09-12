from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.exceptions import NotFound

from .models import Discovery
from .serializers.common import DiscoverySerializer
from .serializers.populated import PopulatedDiscoverSerializer

from rest_framework.permissions import IsAuthenticatedOrReadOnly

class DiscoveryListView(APIView):
    permission_classes = (IsAuthenticatedOrReadOnly,)
    def get(self, _request):
      discoveries = Discovery.objects.all()
      print('discoveries ->', discoveries)
      serialized_discoveries = PopulatedDiscoverSerializer(discoveries, many=True)
      return Response(serialized_discoveries.data, status=status.HTTP_200_OK)

    def post(self, request):
      print('request data ->', request.data)
      discovery_to_add = DiscoverySerializer(data=request.data)
      try:
          discovery_to_add.is_valid(True)
          print(discovery_to_add.validated_data)
          discovery_to_add.save() 
          return Response(discovery_to_add.data, status=status.HTTP_201_CREATED)
      except Exception as e:
          print('ERROR')
          return Response(e.__dict__ if e.__dict__ else str(e), status=status.HTTP_422_UNPROCESSABLE_ENTITY)

class DiscoveryDetailView(APIView):
    def get_discovery(self, pk):
        try:
            return Discovery.objects.get(pk=pk)
        except Discovery.DoesNotExist:
            raise NotFound(detail="🆘 Discovery not found!")
            
    def get(self, _request, pk):
        discovery = self.get_discovery(pk=pk) 
        serialized_discovery = PopulatedDiscoverSerializer(discovery)
        return Response(serialized_discovery.data)

    def delete(self, _request, pk):
        discovery_to_delete = self.get_discovery(pk=pk)
        discovery_to_delete.delete() 
        return Response(status=status.HTTP_204_NO_CONTENT) 

    def put(self, request, pk):
        discovery_to_update = self.get_discovery(pk=pk) 
        updated_discovery = DiscoverySerializer(discovery_to_update, data=request.data) 
        try:
            updated_discovery.is_valid(True) 
            updated_discovery.save()
            return Response(updated_discovery.data, status=status.HTTP_202_ACCEPTED)
        except Exception as e:
            print(e)
            return Response(str(e), status=status.HTTP_422_UNPROCESSABLE_ENTITY)

