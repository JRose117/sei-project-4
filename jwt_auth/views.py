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


# Create your views here.

class RegisterView(APIView):
  def post(self, request):
    user_to_create = UserSerializer(data=request.data)
    try:
      user_to_create.is_valid(True)
      user_to_create.save()
      return Response(user_to_create.data, status=status.HTTP_202_ACCEPTED)
    except Exception as error:
      print(error.__dict__)
      return Response(error.__dict__ if error.__dict__ else str(error), status=status.HTTP_422_UNPROCESSABLE_ENTITY)

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