import pytest
from django.contrib.auth import get_user_model
from django.urls import reverse
from rest_framework.test import APIClient
from rest_framework import status

CREATE_USER_URL = reverse('user:create')
TOKEN_URL = reverse('user:token')
ME_URL = reverse('user:me')


def create_user(**params):
    user = get_user_model().objects.create(email=params['email'], name=params['name'])
    user.set_password(params['password'])
    user.save()
    return user

@pytest.fixture
def client():
    return APIClient()

@pytest.fixture
def authenticated_client():
    client = APIClient()
    user = create_user(
        email='tests@example.com',
        password='testpass123',
        name='Test Name',
    )
    client.force_authenticate(user=user)
    return client, user

@pytest.mark.django_db
def test_create_user_success(client):
    payload = {
        'email': 'tests@example.com',
        'password': 'testpass123',
        'name': 'Test Name',
    }
    res = client.post(CREATE_USER_URL, payload)
    assert res.status_code == status.HTTP_201_CREATED
    user = get_user_model().objects.get(email=payload['email'])
    assert user.check_password(payload['password'])
    assert 'password' not in res.data

@pytest.mark.django_db
def test_user_with_email_exists_error(client):
    payload = {
        'email': 'tests@example.com',
        'password': 'testpass123',
        'name': 'Test Name',
    }
    create_user(**payload)
    res = client.post(CREATE_USER_URL)
    assert res.status_code == status.HTTP_400_BAD_REQUEST

@pytest.mark.django_db
def test_password_too_short_error(client):
    payload = {
        'email': 'tests@example.com',
        'password': 'pw',
        'name': 'Test name',
    }
    res = client.post(CREATE_USER_URL, payload)
    assert res.status_code == status.HTTP_400_BAD_REQUEST
    user_exists = get_user_model().objects.filter(email=payload['email']).exists()
    assert not user_exists

@pytest.mark.django_db
def test_create_token_for_user(client):
    user_details = {
        'name': 'Test Name',
        'email': 'tests@example.com',
        'password': 'tests-user-password123',
    }
    create_user(**user_details)
    payload = {
        'email': user_details['email'],
        'password': user_details['password'],
    }
    res = client.post(TOKEN_URL, payload)
    assert 'token' in res.data
    assert res.status_code == status.HTTP_200_OK

@pytest.mark.django_db
def test_create_token_bad_credentials(client):
    get_user_model().objects.create(email='tests@example.com', password='goodpass')
    payload = {'email': 'tests@example.com', 'password': 'badpass'}
    res = client.post(TOKEN_URL, payload)
    assert 'token' not in res.data
    assert res.status_code == status.HTTP_400_BAD_REQUEST

@pytest.mark.django_db
def test_create_token_email_not_found(client):
    payload = {'email': 'tests@example.com', 'password': 'pass123'}
    res = client.post(TOKEN_URL, payload)
    assert 'token' not in res.data
    assert res.status_code == status.HTTP_400_BAD_REQUEST

@pytest.mark.django_db
def test_create_token_blank_password(client):
    payload = {'email': 'tests@example.com', 'password': ''}
    res = client.post(TOKEN_URL, payload)
    assert 'token' not in res.data
    assert res.status_code == status.HTTP_400_BAD_REQUEST

@pytest.mark.django_db
def test_retrieve_user_unauthorized(client):
    res = client.get(ME_URL)
    assert res.status_code == status.HTTP_401_UNAUTHORIZED

@pytest.mark.django_db
def test_retrieve_profile_success(authenticated_client):
    client, user = authenticated_client
    res = client.get(ME_URL)
    assert res.status_code == status.HTTP_200_OK
    assert res.data == {'name': user.name, 'email': user.email}

@pytest.mark.django_db
def test_post_me_not_allowed(authenticated_client):
    client, _ = authenticated_client
    res = client.post(ME_URL, {})
    assert res.status_code == status.HTTP_405_METHOD_NOT_ALLOWED

@pytest.mark.django_db
def test_update_user_profile(authenticated_client):
    client, user = authenticated_client
    payload = {'name': 'Updated name', 'password': 'newpassword123'}
    res = client.patch(ME_URL, payload)
    user.refresh_from_db()
    assert user.name == payload['name']
    assert user.check_password(payload['password'])
    assert res.status_code == status.HTTP_200_OK
