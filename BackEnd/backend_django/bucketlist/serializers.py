from rest_framework import serializers
from nybusy.models import UserBucketlist


class UserBucketlistSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserBucketlist
        fields = ['user', 'pois']
