from django.urls import path
from leaves.views import *

urlpatterns = [
    path('leavetype/',LeaveTypeCreateView.as_view(),name='leaveTypeCreate'),
    path('leavetype/<int:pk>/',LeaveTypeRetrieveDeleteUpdateView.as_view(),name='leaveTypeDUR'),
    # path('leavebalance/',LeaveBalanceView.as_view(),name='leaveBalanceCreate')
    path('leaverequest/',LeaveRequestView.as_view(), name= 'leaverequest'),
    path('leaveupdate/<int:pk>/',LeaveUpdateView.as_view(),name='leaveupdate'),
]