from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import UserBucketlistViewSet, UserBucketlistItemViewSet

router = DefaultRouter()
router.register('bucketlist', UserBucketlistViewSet)
router.register('bucketlist-item', UserBucketlistItemViewSet)

urlpatterns = [
    path('', include(router.urls)),
]
