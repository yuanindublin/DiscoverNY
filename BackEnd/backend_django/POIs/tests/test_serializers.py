import pytest
from POIs.serializers import POISerializer
from .factories import POIFactory

@pytest.mark.django_db
def test_poi_serializer():
    poi = POIFactory()
    serializer = POISerializer(poi)


    assert serializer.data['name'] == poi.name

