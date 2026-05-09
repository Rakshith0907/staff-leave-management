from django.db import models
from django.conf import settings

# Create your models here.
class LeaveType(models.Model):
    name = models.CharField(max_length=30)
    max_days = models.IntegerField()
    created_at = models.DateTimeField(auto_now_add=True)

class LeaveBalance(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    leave_type = models.ForeignKey(LeaveType, on_delete=models.CASCADE)
    balance = models.IntegerField()
    year = models.IntegerField()
    class Meta:
        unique_together = ['user','leave_type', 'year']

class LeaveRequest(models.Model):
    class Status(models.TextChoices):
        Accepted = 'accepted', 'Accepted'
        Rejected = 'rejected', 'Rejected'
        Pending = 'pending', 'Pending'
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='leave_requests')
    leave_type = models.ForeignKey(LeaveType, on_delete=models.CASCADE)
    start_date = models.DateField()
    end_date = models.DateField()
    reason = models.TextField()
    status = models.CharField(max_length=20, choices=Status.choices, default=Status.Pending)
    reviewed_by = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.SET_NULL, null=True, blank=True, related_name='reviewed_requests')
    created_at = models.DateTimeField(auto_now_add=True)