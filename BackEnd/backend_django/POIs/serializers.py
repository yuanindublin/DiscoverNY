from rest_framework import serializers
from nybusy.models import POI

class POISerializer(serializers.ModelSerializer):
    # adding new field
    coordinate = serializers.SerializerMethodField()

    class Meta:
        model = POI
        fields = ['id', 'addr_city', 'addr_housenumber', 'addr_postcode', 'addr_street', 'description',
                  'geometry', 'location_id', 'name', 'opening_hours', 'tags',
                  'website', 'zone', 'coordinate']  # 添加新的 field 到字段列表中

    # Define a method to retrieve the coordinates.
    def get_coordinate(self, obj):
        return {
            'latitude': obj.latitude,
            'longitude': obj.longitude,
        }
