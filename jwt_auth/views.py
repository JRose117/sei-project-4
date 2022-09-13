from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.exceptions import PermissionDenied
from rest_framework import status
from django.contrib.auth import get_user_model
User = get_user_model()
import jwt
from datetime import datetime, timedelta
from django.conf import settings
from .serializers.common import UserSerializer
# from .serializers.populated import PopulatedUserSerializer


# Create your views here.

class RegisterView(APIView):
  def post(self, request):
    user_to_create = UserSerializer(data=request.data)
    if user_to_create.is_valid():
        user = user_to_create.save()
        dt = datetime.now() + timedelta(days=7)
        token = jwt.encode(
            {'sub': user.id, 'exp': int(dt.strftime('%s'))},
            settings.SECRET_KEY,
            algorithm='HS256'
        )
        print('TOKEN', token)
        return Response({'token': token, 'message': 'Registration Successful'}, status=status.HTTP_202_ACCEPTED)
    return Response(user_to_create.errors, status=status.HTTP_422_UNPROCESSABLE_ENTITY)

class LoginView(APIView):

  def post(self, request):
    email = request.data.get('email')
    password = request.data.get('password')
    try:
      user_to_login = User.objects.get(email=email)
    except User.DoesNotExist:
      raise PermissionDenied("Invalid Credentials")
    if not user_to_login.check_password(password):
      raise PermissionDenied("Invalid Credentials")
    dtime = datetime.now() + timedelta(hours=2)
    token = jwt.encode(
      {
        "sub":user_to_login.id,
        "exp":int(dtime.strftime('%s'))
      },
      settings.SECRET_KEY,
      "HS256"
    ) 
    return Response({"token": token, "message": "You are now logged in"})

class ProfileDetailView(APIView):

    def get_user(self, pk):
        try:
            return User.objects.get(pk=pk)
        except User.DoesNotExist:
            raise PermissionDenied(detail="Invalid Credentials")

    def get(self, _request, pk):
        user = self.get_user(pk=pk)
        serialized_user = UserSerializer(user)
        return Response(serialized_user.data, status=status.HTTP_200_OK)

class ProfileListView(APIView):
    def get(self, _request):
        users = User.objects.all()
        serialized_users = UserSerializer(users, many=True)
        return Response(serialized_users.data, status=status.HTTP_200_OK)