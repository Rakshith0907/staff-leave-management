from django.shortcuts import render
from rest_framework import generics
from rest_framework.permissions import AllowAny
from accounts.serializers import RegisterSerializer,ProfileSerializer, UserSerializer
from rest_framework.permissions import IsAuthenticated
from core.permissions import IsAdmin
from accounts.models import User

# Create your views here.
class RegisterView(generics.CreateAPIView):
    serializer_class = RegisterSerializer
    permission_classes = [IsAdmin] 

class ProfileView(generics.RetrieveUpdateAPIView):
    serializer_class = ProfileSerializer
    permission_classes = [IsAuthenticated]
    def get_object(self):
        return self.request.user
    
class UserListView(generics.ListAPIView):
    serializer_class = UserSerializer
    permission_classes = [IsAdmin]
    queryset = User.objects.all()

class UserDetailView(generics.RetrieveUpdateAPIView):
    serializer_class = UserSerializer
    permission_classes = [IsAdmin]
    queryset = User.objects.filter()