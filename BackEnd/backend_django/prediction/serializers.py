from rest_framework import serializers
from nybusy.models import PredictZone, TaxiZone
from rest_framework_gis.fields import GeometryField

class PredictZoneSerializer(serializers.ModelSerializer):
    class Meta:
        model = PredictZone
        fields = ['time', 'busylevel']

class TaxiZoneSerializer(serializers.ModelSerializer):
    geometry = serializers.SerializerMethodField()
    predictzone = serializers.SerializerMethodField()

    class Meta:
        model = TaxiZone
        fields = ['some_id', 'shape_area', 'objectid', 'shape_leng', 'location_id', 'zone', 'borough', 'geometry','predictzone']

    def get_geometry(self, obj):
        # 先用原始的GeometryField处理geometry数据
        geo_field = GeometryField()
        geometry_data = geo_field.to_representation(obj.geometry)

        # 检查geometry_data是否是None
        if geometry_data is None:
            return None

        # 然后根据需要修改geometry_data
        if geometry_data['type'] == 'MultiPolygon':
            geometry_data['coordinates'] = geometry_data['coordinates'][0]

        return geometry_data

    def get_predictzone(self, obj):
        predictzones = PredictZone.objects.filter(location_id=obj.location_id)
        if predictzones:
            return [PredictZoneSerializer(pz).data for pz in predictzones]
        return None
