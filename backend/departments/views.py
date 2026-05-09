from django.shortcuts import render
from rest_framework import generics
from departments.serializers import DepartmentSerializer
from departments.models import Department
from core.permissions import IsAdmin, IsManager
from rest_framework.permissions import IsAuthenticated

# Create your views here.
class DepartmentListCreateView(generics.ListCreateAPIView):
    queryset = Department.objects.all()
    serializer_class = DepartmentSerializer
    def get_permissions(self):
        if self.request.method == 'POST':
            return [IsAdmin()]
        return [IsAuthenticated()]

class DepartmentRetrieveDeleteUpdateView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Department.objects.all()
    serializer_class = DepartmentSerializer
    def get_permissions(self):
        if self.request.method in ['PUT','PATCH','DELETE']:
            return [IsAdmin()]
        return [IsAuthenticated()]