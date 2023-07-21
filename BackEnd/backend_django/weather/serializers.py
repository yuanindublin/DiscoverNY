# weather/serializers.py
from rest_framework import serializers
from nybusy.models import WeatherData

class WeatherDataSerializer(serializers.ModelSerializer):
    class Meta:
        model = WeatherData
        fields = '__all__'  # We want to use all fields in the model.
