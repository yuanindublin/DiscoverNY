from django.urls import include, path
from rest_framework.routers import DefaultRouter
from .views import PredictZoneViewSet, TaxiZoneViewSet

router = DefaultRouter()
router.register(r'predictzones', PredictZoneViewSet)
router.register(r'taxizones', TaxiZoneViewSet)

urlpatterns = [
    path('', include(router.urls)),
]