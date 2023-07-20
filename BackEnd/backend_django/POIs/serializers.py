from rest_framework import serializers
from nybusy.models import POI, POIImage

class POIImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = POIImage
        fields = ['id', 'image']

class POISerializer(serializers.ModelSerializer):
    coordinate = serializers.SerializerMethodField()
    images = POIImageSerializer(many=True, read_only=True)

    class Meta:
        model = POI
        fields = ['id', 'addr_city', 'addr_housenumber', 'addr_postcode',
                  'addr_street', 'description', 'geometry', 'location_id',
                  'name', 'opening_hours', 'tags', 'website', 'zone',
                  'coordinate', 'images']

    def get_coordinate(self, obj):
        return {
            'latitude': obj.latitude,
            'longitude': obj.longitude,
        }

