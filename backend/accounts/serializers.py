from rest_framework import serializers
from accounts.models import User
from departments.serializers import DepartmentSerializer
from departments.models import Department


class RegisterSerializer(serializers.ModelSerializer):
    class Meta:
        model= User
        fields = ['username', 'email', 'password', 'role']
        extra_kwargs = {'password':{'write_only':True}}
    
    def create(self, validated_data):
        user = User.objects.create_user(
            username= validated_data['username'],
            email = validated_data['email'],
            password = validated_data['password'],
            role = validated_data['role']
        )
        return user

class ProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model= User
        fields = ['id','username', 'email', 'role','department']
        read_only_fields = ['id','role']

class UserSerializer(serializers.ModelSerializer):
    department = DepartmentSerializer(read_only =True)
    department_id = serializers.PrimaryKeyRelatedField(
        queryset =Department.objects.all(), source= 'department', write_only= True
    )
    class Meta:
        model = User
        fields = ['id','username', 'email', 'role','department','department_id']
        read_only_fields = ['id']
        
    
