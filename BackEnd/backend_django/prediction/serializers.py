from rest_framework import serializers
from nybusy.models import PredictZone, TaxiZone
from rest_framework_gis.fields import GeometryField

class PredictZoneSerializer(serializers.ModelSerializer):
    busyindex = serializers.SerializerMethodField()

    class Meta:
        model = PredictZone
        fields = ['time', 'busylevel','busyindex']

    def get_busyindex(self, obj):
        taxi_zone = obj.location_id

        if taxi_zone.twenty_five_percentile is None or taxi_zone.fifty_percentile is None or taxi_zone.seventy_five_percentile is None:
            return 'Data Unavailable'
        else:
            if obj.busylevel < taxi_zone.twenty_five_percentile:
                return 'Not Busy'
            elif obj.busylevel < taxi_zone.fifty_percentile:
                return 'A little Busy'
            elif obj.busylevel < taxi_zone.seventy_five_percentile:
                return 'Busy'
            else:
                return 'Very Busy'

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

        # 获取请求的时间查询参数
        time_str = self.context['request'].query_params.get('time', None)
        if time_str is not None:
            from django.utils.dateparse import parse_datetime
            time_obj = parse_datetime(time_str)
            if time_obj is not None:
                # 如果有时间查询参数，那么在查询 PredictZone 时使用这个参数
                predictzones = predictzones.filter(time=time_obj)

        if predictzones:
            serializer = PredictZoneSerializer(predictzones, many=True, context=self.context)
            return serializer.data

        return None
