from django.shortcuts import render
from rest_framework import viewsets
from .serializers import PredictZoneSerializer, TaxiZoneSerializer
from nybusy.models import PredictZone, TaxiZone
from rest_framework.response import Response
from rest_framework import status
from django.utils.dateparse import parse_datetime
from rest_framework.permissions import AllowAny


class TaxiZoneViewSet(viewsets.ModelViewSet):
    permission_classes = [AllowAny]
    queryset = TaxiZone.objects.all()
    serializer_class = TaxiZoneSerializer

# class PredictZoneViewSet(viewsets.ModelViewSet):
#     queryset = PredictZone.objects.all().order_by('location_id')
#     serializer_class = PredictZoneSerializer

class PredictZoneViewSet(viewsets.ModelViewSet):
    permission_classes = [AllowAny]
    serializer_class = PredictZoneSerializer
    queryset = PredictZone.objects.all()

    def get_queryset(self):
        queryset = PredictZone.objects.all().order_by('location_id').select_related('location_id')
        time_str = self.request.query_params.get('time', None)
        if time_str is not None:
            time_obj = parse_datetime(time_str)
            if time_obj is not None:
                queryset = queryset.filter(time=time_obj)
            else:
                return Response({"error": "Invalid time format"}, status=status.HTTP_400_BAD_REQUEST)
        return queryset