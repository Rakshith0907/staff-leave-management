from django.db import models
from django.contrib.auth.models import AbstractUser
from departments.models import Department

# Create your models here.

class User(AbstractUser):
    class Role(models.TextChoices):
        EMPLOYEE = 'employee', 'Employee'
        MANAGER = 'manager', 'Manager'
        ADMIN = 'admin', 'Admin'
    role = models.CharField(max_length=20, choices=Role.choices, default=Role.EMPLOYEE)
    department = models.ForeignKey(Department,on_delete=models.SET_NULL, null=True, blank=True)
