from django.urls import path
from departments.views import *

urlpatterns=[
    path('', DepartmentListCreateView.as_view(), name='departmentListCreate'),
    path('<int:pk>/', DepartmentRetrieveDeleteUpdateView.as_view(), name='departmentRetrieveDeleteUpdate')
]