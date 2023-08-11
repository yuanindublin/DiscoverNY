import pytest
from datetime import datetime
from rest_framework.test import APIClient
from rest_framework import status
from nybusy.models import TaxiZone, PredictZone
from prediction.serializers import TaxiZoneSerializer, PredictZoneSerializer
from .factories import TaxiZoneFactory, PredictZoneFactory
from rest_framework.request import Request
from rest_framework.test import APIRequestFactory

@pytest.fixture
def api_client():
    return APIClient()

# Setup TaxiZone data
@pytest.fixture
@pytest.mark.django_db
def create_taxi_zone():
    return TaxiZone.objects.create(
        some_id=1,
        objectid=1,
        location_id=100,
        zone="Test Zone",
        borough="Test Borough"
    )

# Setup PredictZone data
@pytest.fixture
@pytest.mark.django_db
def create_predict_zone(create_taxi_zone):
    return PredictZone.objects.create(
        location_id=create_taxi_zone,
        time=datetime.now(),
        busylevel=1.0,
        time_index=1,
        busyindex="Test Index"
    )

# Test TaxiZone serializer
@pytest.mark.django_db
def test_taxi_zone_serializer():
    taxi_zone = TaxiZoneFactory()
    context = {'request': Request(APIRequestFactory().get('/'))}
    serializer = TaxiZoneSerializer(taxi_zone, context=context)
    assert 'location_id' in serializer.data

@pytest.mark.django_db
def test_predict_zone_serializer():
    predict_zone = PredictZoneFactory()
    context = {'request': Request(APIRequestFactory().get('/'))}
    serializer = PredictZoneSerializer(predict_zone, context=context)
    assert 'location_id' in serializer.data


# Test TaxiZone viewset (replace '/endpoint/' with your actual endpoint)
@pytest.mark.django_db
def test_taxi_zone_viewset(api_client):
    taxi_zone = TaxiZoneFactory()
    response = api_client.get(f'/api/taxizones/{taxi_zone.location_id}/')
    assert response.status_code == 200

