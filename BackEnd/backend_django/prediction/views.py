from django.shortcuts import render
from rest_framework import viewsets
from .serializers import PredictZoneSerializer, TaxiZoneSerializer
from nybusy.models import PredictZone, TaxiZone

class TaxiZoneViewSet(viewsets.ModelViewSet):
    queryset = TaxiZone.objects.all()
    serializer_class = TaxiZoneSerializer

class PredictZoneViewSet(viewsets.ModelViewSet):
    queryset = PredictZone.objects.all().order_by('location_id')
    serializer_class = PredictZoneSerializer