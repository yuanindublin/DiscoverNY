from rest_framework import viewsets, permissions, status
from rest_framework.response import Response
from nybusy.models import UserBucketlist, UserBucketlistItem
from .serializers import UserBucketlistSerializer, UserBucketlistItemSerializer
from POIs.serializers import POISerializer
from rest_framework.decorators import action

class UserBucketlistViewSet(viewsets.ModelViewSet):
    queryset = UserBucketlist.objects.all()
    serializer_class = UserBucketlistSerializer
    # Only authenticated users
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        """Retrieve the bucketlists for the authenticated user only"""
        return self.queryset.filter(user=self.request.user)

class UserBucketlistItemViewSet(viewsets.ModelViewSet):
    queryset = UserBucketlistItem.objects.all()
    serializer_class = UserBucketlistItemSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        """Retrieve the bucketlist items for the authenticated user only"""
        return self.queryset.filter(user=self.request.user)

    def perform_create(self, serializer):
        """Create a new bucketlist item"""
        serializer.save(user=self.request.user)

    @action(detail=True, methods=['put'], permission_classes=[permissions.IsAuthenticated])
    def update_planned_time(self, request, pk=None):
        bucketlist_item = self.get_object()
        planned_time = request.data.get('planned_time')

        # Validate planned_time here if necessary

        bucketlist_item.planned_time = planned_time
        bucketlist_item.save()
        return Response(status=status.HTTP_200_OK)

    @action(detail=False, methods=['get'], permission_classes=[permissions.IsAuthenticated])
    def view_bucketlist(self, request):
        user = request.user
        bucketlist_items = UserBucketlistItem.objects.filter(user=user)
        pois = [item.poi for item in bucketlist_items]

        serializer = POISerializer(pois, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)