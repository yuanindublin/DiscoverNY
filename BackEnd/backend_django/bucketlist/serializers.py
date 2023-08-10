from rest_framework import serializers
from nybusy.models import UserBucketlist, UserBucketlistItem


class UserBucketlistSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserBucketlist
        fields = ['user', 'pois']

class UserBucketlistItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserBucketlistItem
        fields = ['user', 'poi', 'planned_time']
