from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import UserBucketlistViewSet

router = DefaultRouter()
router.register('', UserBucketlistViewSet)

urlpatterns = [
    path('', include(router.urls)),
]
