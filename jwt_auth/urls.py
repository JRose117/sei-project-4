from django.urls import path
from .views import RegisterView, LoginView, ProfileDetailView, ProfileListView
urlpatterns = [
  path('register/', RegisterView.as_view()),
  path('login/', LoginView.as_view()),
  path('profile/<int:pk>/', ProfileDetailView.as_view()),
  path('users/', ProfileListView.as_view())
]