from rest_framework import serializers
from nybusy.models import POI


class POISerializer(serializers.ModelSerializer):
    class Meta:
        model = POI
        fields = ['id', 'name', 'description', 'latitude',
                  'longitude', 'address', 'opening_hours', 'category']
