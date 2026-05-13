from django.shortcuts import render
from rest_framework import generics
from leaves.models import LeaveBalance,LeaveRequest,LeaveType
from leaves.serializers import LeaveTypeSerializer,LeaveRequestSerializer, LeaveRequestUpdateSerializer
from core.permissions import IsAdmin, IsManager, IsManagerOrAdmin
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

# class LeaveBalanceView(generics.ListCreateAPIView):
#     serializer_class=LeaveBalanceSerializer
#     def get_queryset(self):
#         if self.request.user.role == 'admin':
#             return LeaveBalance.objects.all()
#         return LeaveBalance.objects.filter(user=self.request.user)
    
#     def get_permissions(self):
#         if self.request == 'POST':
#             return [IsAdmin()]
#         return [IsAuthenticated()]
    
#     def perform_create(self,serializer):
#         leave_type = serializer.validated_data['leave_type']
#         serializer.save(user= self.request.user, balance = leave_type.max_days)

class LeaveRequestView(generics.ListCreateAPIView):
    serializer_class = LeaveRequestSerializer
    def get_queryset(self):
        user = self.request.user
        if user.role == 'admin':
            return LeaveRequest.objects.all()
        elif user.role == 'manager':
            return LeaveRequest.objects.filter(user__department=user.department)
        return LeaveRequest.objects.filter(user=user)
    
    def get_permissions(self):
        return [IsAuthenticated()]
    
    def perform_create(self,serializer):
        serializer.save(user = self.request.user)

class LeaveUpdateView(generics.UpdateAPIView):
    serializer_class = LeaveRequestUpdateSerializer
    def get_queryset(self):
        user=self.request.user
        if user.role == 'admin':
            return LeaveRequest.objects.all()
        elif user.role == 'manager':
            return LeaveRequest.objects.filter(user__department = user.department)
        return LeaveRequest.objects.none()

    def get_permissions(self):
        return [IsManagerOrAdmin()]

    def perform_update(self, serializer):
        serializer.save(reviewed_by = self.request.user)
        
