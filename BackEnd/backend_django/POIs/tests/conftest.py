import pytest
from rest_framework.test import APIClient
from .factories import POIFactory, UserFactory

@pytest.fixture
def api_client():
    return APIClient()

@pytest.fixture
def poi():
    return POIFactory()

@pytest.fixture
def user():
    return UserFactory()
