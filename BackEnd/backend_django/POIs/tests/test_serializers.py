import pytest
from rest_framework.test import APIRequestFactory
from rest_framework.request import Request
from POIs.serializers import POISerializer
from .factories import POIFactory


@pytest.mark.django_db
def test_poi_serializer():

    factory = APIRequestFactory()
    request = factory.get('/')

    request = Request(request)

    poi = POIFactory()

    serializer = POISerializer(poi, context={'request': request})

    assert serializer.data['name'] == poi.name
