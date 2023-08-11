from unittest.mock import patch, Mock
import pytest
from rest_framework.test import APIClient
from rest_framework import status



@pytest.fixture
def api_client():
    return APIClient()


@pytest.fixture
def user():
    mock_user = Mock(id=1, username="user1")
    return mock_user


@pytest.fixture
def user_with_bucketlist_item(user):
    mock_bucketlist_item = Mock(id=1, user=user, poi='Some POI', planned_time='2023-01-01T12:00:00')
    return mock_bucketlist_item


@patch.object(APIClient, 'post')
def test_create_bucketlist_item(mocked_post, api_client, user):
    api_client.force_authenticate(user)
    data = {
        'poi': 'Some POI',
        'planned_time': '2023-01-01T12:00:00'
    }

    mocked_response = Mock()
    mocked_response.status_code = status.HTTP_201_CREATED
    mocked_response.data = data

    mocked_post.return_value = mocked_response

    response = api_client.post('/bucketlist-item/', data)
    assert response.status_code == status.HTTP_201_CREATED
    assert response.data['poi'] == data['poi']


@patch.object(APIClient, 'get')
def test_retrieve_bucketlist_item(mocked_get, api_client, user_with_bucketlist_item):
    api_client.force_authenticate(user_with_bucketlist_item.user)

    mocked_response = Mock()
    mocked_response.status_code = status.HTTP_200_OK
    mocked_response.data = {'poi': 'Some POI', 'planned_time': '2023-01-01T12:00:00'}

    mocked_get.return_value = mocked_response

    response = api_client.get(f'/bucketlist-item/{user_with_bucketlist_item.id}/')
    assert response.status_code == status.HTTP_200_OK
    assert 'poi' in response.data


@patch.object(APIClient, 'put')
def test_update_bucketlist_item_planned_time(mocked_put, api_client, user_with_bucketlist_item):
    api_client.force_authenticate(user_with_bucketlist_item.user)
    new_time = '2024-01-01T12:00:00'

    mocked_response = Mock()
    mocked_response.status_code = status.HTTP_200_OK
    mocked_response.data = {'planned_time': new_time}

    mocked_put.return_value = mocked_response

    response = api_client.put(f'/bucketlist-item/{user_with_bucketlist_item.id}/update_planned_time/',
                              {'planned_time': new_time})
    assert response.status_code == status.HTTP_200_OK
    assert response.data['planned_time'] == new_time

