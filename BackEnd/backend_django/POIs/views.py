from django.shortcuts import render
from rest_framework.decorators import action
from rest_framework import viewsets, permissions, status
from rest_framework.response import Response
from nybusy.models import POI, UserBucketlist, POIImage   # add this line
from bucketlist.serializers import UserBucketlistSerializer
from .serializers import POISerializer, POIImageSerializer  # add POIImageSerializer here

class POIViewSet(viewsets.ModelViewSet):
    queryset = POI.objects.all()
    serializer_class = POISerializer
    permission_classes = [permissions.AllowAny]  # by default allow any user

    @action(detail=True, methods=['post'], permission_classes=[permissions.IsAuthenticated])
    def like(self, request, pk=None):
        poi = self.get_object()

        if request.user in poi.liked_by.all():
            poi.liked_by.remove(request.user)
            UserBucketlist.objects.filter(
                user=request.user, poi=poi).delete()
            return Response(status=status.HTTP_204_NO_CONTENT)

        else:
            poi.liked_by.add(request.user)
            UserBucketlist.objects.create(user=request.user, poi=poi)
            return Response(status=status.HTTP_201_CREATED)


class POIImageViewSet(viewsets.ModelViewSet):   # add this class
    queryset = POIImage.objects.all()
    serializer_class = POIImageSerializer
    permission_classes = [permissions.AllowAny]  # adjust as needed

    def list(self, request, poi_id=None):
        queryset = self.queryset.filter(poi_id=poi_id)
        serializer = self.serializer_class(queryset, many=True)

        return Response(serializer.data)

    # def partial_update(self, request, *args, **kwargs):
    #     # change permission for this particular action
    #     self.permission_classes = [permissions.IsAuthenticated]
    #     # ensure the correct permissions are checked
    #     self.check_permissions(request)
    #
    #     instance = self.get_object()
    #
    #     # If the user is in the list of users who liked this POI, remove him
    #     if request.user in instance.liked_by.all():
    #         instance.liked_by.remove(request.user)
    #         UserBucketlist.objects.filter(
    #             user=request.user, poi=instance).delete()
    #         return Response(status=status.HTTP_204_NO_CONTENT)
    #     # Otherwise, add him
    #     else:
    #         instance.liked_by.add(request.user)
    #         # Add additional fields as necessary
    #         UserBucketlist.objects.create(user=request.user, poi=instance)
    #         return Response(status=status.HTTP_201_CREATED)
