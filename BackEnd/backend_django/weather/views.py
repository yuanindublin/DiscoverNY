from django.shortcuts import render

# Create your views here.

from rest_framework import viewsets
from nybusy.models import WeatherData
from .serializers import WeatherDataSerializer
from rest_framework.permissions import AllowAny

class WeatherDataViewSet(viewsets.ModelViewSet):
    permission_classes = [AllowAny]
    queryset = WeatherData.objects.all()
    serializer_class = WeatherDataSerializer

