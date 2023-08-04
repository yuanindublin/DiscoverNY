from rest_framework import serializers
from nybusy.models import POI, POIImage, PredictZone
from prediction.serializers import PredictZoneSerializer


class POIImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = POIImage
        fields = ['id', 'image']


class POISerializer(serializers.ModelSerializer):
    coordinate = serializers.SerializerMethodField()
    images = POIImageSerializer(many=True, read_only=True)
    predictions = serializers.SerializerMethodField()  # Add this line

    class Meta:
        model = POI
        fields = ['id', 'addr_city', 'addr_housenumber', 'addr_postcode',
                  'addr_street', 'description', 'geometry', 'location_id',
                  'name', 'opening_hours', 'tags', 'website', 'zone',
                  'coordinate', 'images', 'predictions']  # Add 'predictions' here

    def get_coordinate(self, obj):
        return {
            'latitude': obj.latitude,
            'longitude': obj.longitude,
        }

    def get_predictions(self, obj):
        predictions = PredictZone.objects.filter(location_id=obj.location_id)

        # Get the time query parameter from the request
        time_index_str = self.context['request'].query_params.get('time_index', None)
        if time_index_str is not None:
            time_index = int(time_index_str)
            if time_index is not None:
                # If a time query parameter is provided, use it to filter the PredictZone query
                predictions = predictions.filter(time_index=time_index)

        if predictions:
            serializer = PredictZoneSerializer(predictions, many=True, context=self.context)
            return serializer.data

        return None


