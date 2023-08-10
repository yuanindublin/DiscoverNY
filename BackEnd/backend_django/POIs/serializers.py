from rest_framework import serializers
from nybusy.models import POI, POIImage, PredictPOI
from backend_django import settings

class PredictPOISerializer(serializers.ModelSerializer):
    class Meta:
        model = PredictPOI
        fields = ['time', 'busylevel', 'time_index', 'busyindex']

class POIImageSerializer(serializers.ModelSerializer):
    image = serializers.SerializerMethodField()
    class Meta:
        model = POIImage
        fields = ['id', 'image']
    def get_image(self, obj):
        return f"http://{settings.HOSTNAME}{obj.image.url}"

class POISerializer(serializers.ModelSerializer):
    coordinate = serializers.SerializerMethodField()
    images = POIImageSerializer(many=True, read_only=True)
    predictions = serializers.SerializerMethodField()

    class Meta:
        model = POI
        fields = ['id', 'addr_city', 'addr_housenumber', 'addr_postcode',
                  'addr_street', 'description', 'geometry', 'location_id',
                  'name', 'opening_hours', 'tags', 'website', 'zone',
                  'coordinate', 'images', 'predictions']

    def get_coordinate(self, obj):
        return {
            'latitude': obj.latitude,
            'longitude': obj.longitude,
        }

    def get_predictions(self, obj):
        predictions = PredictPOI.objects.filter(poi=obj)  # Change the filter to match the POI directly

        # Get the time query parameter from the request
        time_index_str = self.context['request'].query_params.get('time_index', None)
        if time_index_str is not None:
            time_index = int(time_index_str)
            if time_index is not None:
                # If a time query parameter is provided, use it to filter the PredictPOI query
                predictions = predictions.filter(time_index=time_index)

        if predictions:
            serializer = PredictPOISerializer(predictions, many=True, context=self.context)
            return serializer.data

        return None
