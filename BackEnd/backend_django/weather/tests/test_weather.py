import pytest
from rest_framework.test import APIClient
from .factories import WeatherDataFactory
from nybusy.models import WeatherData
from weather.serializers import WeatherDataSerializer

# Setup API client
@pytest.fixture
def api_client():
    return APIClient()

# Tests for Serializers
@pytest.mark.django_db
def test_weather_data_serializer():
    weather_data = WeatherDataFactory()
    serializer = WeatherDataSerializer(weather_data)
    assert 'id' in serializer.data  # Assuming 'id' is one of the fields in WeatherData

# Tests for Viewsets
@pytest.mark.django_db
def test_weather_data_viewset_list():
    api_client = APIClient()
    response = api_client.get('/api/weatherdata/')
    assert response.status_code == 200

@pytest.mark.django_db
def test_weather_data_viewset_retrieve():
    api_client = APIClient()
    weather_data = WeatherData.objects.create(  # You can fill in necessary fields here
        # ...your fields and values here...
    )
    response = api_client.get(f'/api/weatherdata/{weather_data.id}/')
    assert response.status_code == 200
