from django.shortcuts import render
from django.db import IntegrityError
from django.urls import reverse
from django.http import JsonResponse
from rest_framework.decorators import action
from rest_framework import viewsets, permissions, status
from rest_framework.response import Response
from nybusy.models import POI, UserBucketlist, POIImage, UserBucketlistItem
from bucketlist.serializers import UserBucketlistSerializer
from .serializers import POISerializer, POIImageSerializer

class POIViewSet(viewsets.ModelViewSet):
    queryset = POI.objects.all()
    serializer_class = POISerializer
    permission_classes = [permissions.AllowAny]

    @action(detail=True, methods=['post'], permission_classes=[permissions.IsAuthenticated])
    def like(self, request, pk=None):
        poi = self.get_object()

        if request.user in poi.liked_by.all():
            poi.liked_by.remove(request.user)
            UserBucketlistItem.objects.filter(user=request.user, poi=poi).delete()
            return Response(status=status.HTTP_204_NO_CONTENT)

        else:
            try:
                UserBucketlistItem.objects.create(user=request.user, poi=poi)
                poi.liked_by.add(request.user)
                return Response(status=status.HTTP_201_CREATED)
            except IntegrityError:
                return Response({"detail": "Already exists."}, status=status.HTTP_400_BAD_REQUEST)

    @action(detail=False, methods=['get'])
    def tag(self, request, tag=None):
            if tag is None:
                tags = POI.objects.values_list('tags', flat=True).distinct()
                tag_urls = {tag: request.build_absolute_uri(reverse('poi-tag', args=[tag])) for tag in tags}
                return JsonResponse(tag_urls)
            else:
                pois = POI.objects.filter(tags__icontains=tag)
                serializer = self.get_serializer(pois, many=True)
                return Response(serializer.data)

class POIImageViewSet(viewsets.ModelViewSet):
    queryset = POIImage.objects.all()
    serializer_class = POIImageSerializer
    permission_classes = [permissions.AllowAny]

    def list(self, request, poi_id=None):
        queryset = self.queryset.filter(poi_id=poi_id)
        serializer = self.serializer_class(queryset, many=True)

        return Response(serializer.data)
