from rest_framework import serializers
from nybusy.models import PredictZone, TaxiZone

class PredictZoneSerializer(serializers.ModelSerializer):
    class Meta:
        model = PredictZone
        fields = ['time', 'busylevel']

class TaxiZoneSerializer(serializers.ModelSerializer):
    predictzone = serializers.SerializerMethodField()

    class Meta:
        model = TaxiZone
        fields = ['some_id', 'shape_area', 'objectid', 'shape_leng', 'location_id', 'zone', 'borough', 'predictzone']

    def get_predictzone(self, obj):
        predictzones = PredictZone.objects.filter(location_id=obj.location_id)
        if predictzones:
            return [PredictZoneSerializer(pz).data for pz in predictzones]
        return None