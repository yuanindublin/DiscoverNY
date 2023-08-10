import pytest
from rest_framework import status

@pytest.mark.django_db
def test_get_poi(api_client, poi):
    response = api_client.get(f"/api/POIs/{poi.id}/")
    assert response.status_code == status.HTTP_200_OK
    assert response.data['name'] == poi.name

@pytest.mark.django_db
def test_get_poi_by_tag(api_client):
    tag = "example_tag"
    response = api_client.get(f"/api/POIs/tag/{tag}/")
    assert response.status_code == status.HTTP_200_OK

