from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import POIViewSet

router = DefaultRouter()
router.register('', POIViewSet, basename='poi')

urlpatterns = [
    path('', include(router.urls)),
    path('tag/<str:tag>/', POIViewSet.as_view({'get': 'tag'}), name='poi-tag'),
]

