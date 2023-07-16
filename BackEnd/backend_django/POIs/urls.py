from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import POIViewSet

router = DefaultRouter()
router.register('', POIViewSet)

urlpatterns = [
    path('', include(router.urls)),
]
''''''