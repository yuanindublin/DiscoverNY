import pytest
from django.contrib.auth import get_user_model
from django.urls import reverse

@pytest.mark.django_db
def test_user_list(client, django_user_model):
    """Test that users are listed on page"""
    admin_user = django_user_model.objects.create_superuser(
        email='admin@example.com',
        password='testpass123'
    )
    client.force_login(admin_user)

    user = django_user_model.objects.create_user(
        email='user@example.com',
        password='testpass123',
        name='Test User'
    )

    url = reverse('admin:nybusy_user_changelist')
    res = client.get(url)

    assert user.name in str(res.content)
    assert user.email in str(res.content)

@pytest.mark.django_db
def test_edit_user_page(client, django_user_model):
    """Test the edit user page works"""
    admin_user = django_user_model.objects.create_superuser(
        email='admin@example.com',
        password='testpass123'
    )
    client.force_login(admin_user)

    user = django_user_model.objects.create_user(
        email='user@example.com',
        password='testpass123',
        name='Test User'
    )

    url = reverse('admin:nybusy_user_change', args=[user.id])
    res = client.get(url)

    assert res.status_code == 200

@pytest.mark.django_db
def test_create_user_page(client, django_user_model):
    """Test the create user page works"""
    admin_user = django_user_model.objects.create_superuser(
        email='admin@example.com',
        password='testpass123'
    )
    client.force_login(admin_user)

    url = reverse('admin:nybusy_user_add')
    res = client.get(url)

    assert res.status_code == 200
