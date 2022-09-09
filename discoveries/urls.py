from django.urls import path
from .views import DiscoveryListView, DiscoveryDetailView

urlpatterns = [
  path('', DiscoveryListView.as_view()),
  path('<int:pk>/', DiscoveryDetailView.as_view())  
]