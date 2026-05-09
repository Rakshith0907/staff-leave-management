from django.urls import path
from leaves.views import *

urlpatterns = [
    path('leavetype/',LeaveTypeCreateView.as_view(),name='leaveTypeCreate'),
    path('leavetype/<int:pk>/',LeaveTypeRetrieveDeleteUpdateView.as_view(),name='leaveTypeDUR'),
]