from django.shortcuts import render

# Create your views here.

from rest_framework import viewsets
from nybusy.models import WeatherData
from .serializers import WeatherDataSerializer

class WeatherDataViewSet(viewsets.ModelViewSet):
    queryset = WeatherData.objects.all()
    serializer_class = WeatherDataSerializer

