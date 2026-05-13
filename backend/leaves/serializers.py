from rest_framework import serializers
from leaves.models import *
from datetime import date

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
    def validate(self, data):
        today = date.today()
        if data['start_date'] < today:
            raise serializers.ValidationError("Start date cannot be in the past")
        
        if data['end_date'] < data['start_date']:
            raise serializers.ValidationError("End date cannot be before start date")
        
        if data['start_date'].weekday() >= 5:
            raise serializers.ValidationError("Leave cannot start on a weekend")

        if data['end_date'].weekday() >= 5:
            raise serializers.ValidationError("Leave cannot end on a weekend")
        
        return data
    class Meta:
        model = LeaveRequest
        fields = ['id','user','leave_type','start_date','end_date','reason','status','reviewed_by','created_at']
        read_only_fields = ['user','status','reviewed_by','created_at']

class LeaveRequestUpdateSerializer(serializers.ModelSerializer):
    class Meta:
        model = LeaveRequest
        fields = ['status']
