from django.urls import include, path
from django.urls import path
from .views import my_view  # 确保你已经在你的views.py中定义了my_view

urlpatterns = [
    path('test/', my_view),
]
