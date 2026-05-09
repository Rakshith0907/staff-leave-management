from rest_framework import serializers
from leaves.models import *

class LeaveTypeSerializer(serializers.ModelSerializer):
    class Meta:
        model = LeaveType
        fields = ['id','name','max_days','created_at']
        read_only_fields = ['created_at']