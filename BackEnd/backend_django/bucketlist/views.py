from rest_framework import viewsets, permissions
from nybusy.models import UserBucketlist
from .serializers import UserBucketlistSerializer


class UserBucketlistViewSet(viewsets.ModelViewSet):
    queryset = UserBucketlist.objects.all()
    serializer_class = UserBucketlistSerializer
    # Only authenticated users
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        """Retrieve the bucketlists for the authenticated user only"""
        return self.queryset.filter(user=self.request.user)
