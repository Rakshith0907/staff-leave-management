from django.shortcuts import render
from rest_framework import generics
from leaves.models import LeaveBalance,LeaveRequest,LeaveType
from leaves.serializers import LeaveTypeSerializer
from core.permissions import IsAdmin, IsManager
from rest_framework.permissions import IsAuthenticated
# Create your views here.
class LeaveTypeCreateView(generics.ListCreateAPIView):
    queryset = LeaveType.objects.all()
    serializer_class = LeaveTypeSerializer
    def get_permissions(self):
        if self.request.method == 'POST':
            return [IsAdmin()]
        return [IsAuthenticated()]  
    
class LeaveTypeRetrieveDeleteUpdateView(generics.RetrieveUpdateDestroyAPIView):
    queryset = LeaveType.objects.all()
    serializer_class = LeaveTypeSerializer
    def get_permissions(self):
        if self.request.method in ['PATCH', 'PUT', 'DELETE']:
            return [IsAdmin()]
        return [IsAuthenticated()]
