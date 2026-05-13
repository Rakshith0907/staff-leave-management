from rest_framework import serializers
from leaves.models import *

class LeaveTypeSerializer(serializers.ModelSerializer):
    class Meta:
        model = LeaveType
        fields = ['id','name','max_days','created_at']
        read_only_fields = ['created_at']

# class LeaveBalanceSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = LeaveBalance
#         fields = ['id','user', 'leave_type', 'balance', 'year']
#         read_only_fields= ['user', 'balance']


class LeaveRequestSerializer(serializers.ModelSerializer):
    class Meta:
        model = LeaveRequest
        fields = ['id','user','leave_type','start_date','end_date','reason','status','reviewed_by','created_at']
        read_only_fields = ['user','status','reviewed_by','created_at']

class LeaveRequestUpdateSerializer(serializers.ModelSerializer):
    class Meta:
        model = LeaveRequest
        fields = ['status']
