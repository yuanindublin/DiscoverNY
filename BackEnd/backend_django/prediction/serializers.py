from rest_framework import serializers
from nybusy.models import PredictZone, TaxiZone
from rest_framework_gis.fields import GeometryField

class PredictZoneSerializer(serializers.ModelSerializer):
    location_id = serializers.PrimaryKeyRelatedField(read_only=True)

    class Meta:
        model = PredictZone
        fields = ['time', 'time_index', 'busylevel','busyindex','location_id']



class TaxiZoneSerializer(serializers.ModelSerializer):
    geometry = serializers.SerializerMethodField()
    predictzone = serializers.SerializerMethodField()

    class Meta:
        model = TaxiZone
        fields = ['location_id', 'zone', 'borough', 'geometry','predictzone']

    def get_geometry(self, obj):
        # Firstly, process the geometry data with the original GeometryField
        geo_field = GeometryField()
        geometry_data = geo_field.to_representation(obj.geometry)

        # Check if geometry_data is None
        if geometry_data is None:
            return None

        # Then modify geometry_data according to need
        if geometry_data['type'] == 'MultiPolygon':
            geometry_data['coordinates'] = geometry_data['coordinates'][0]

        return geometry_data

    def get_predictzone(self, obj):
        predictzones = PredictZone.objects.filter(location_id=obj.location_id)

        # Get the time query parameter from the request
        time_index_str = self.context['request'].query_params.get('time_index', None)
        if time_index_str is not None:
            time_index = int(time_index_str)
            if time_index is not None:
                # If a time query parameter is provided, use it to filter the PredictZone query
                predictzones = predictzones.filter(time_index=time_index)

        if predictzones:
            serializer = PredictZoneSerializer(predictzones, many=True, context=self.context)
            return serializer.data

        return None

