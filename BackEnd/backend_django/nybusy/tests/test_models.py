import pytest
from django.contrib.auth import get_user_model
from nybusy.models import User,WeatherData,TaxiZone,PredictZone,POI,POIImage,PredictPOI,UserBucketlist,UserBucketlistItem
import datetime

@pytest.mark.django_db
def test_create_user_with_email_successful():
    """Test creating a user with an email is successful"""
    email = 'tests@example.com'
    password = 'testpass123'
    user = get_user_model().objects.create_user(
        email=email,
        password=password,
    )

    assert user.email == email
    assert user.check_password(password)

@pytest.mark.django_db
def test_new_user_email_normalized():
    """Test email is normalized for new users."""
    sample_emails = [
        ['test1@EXAMPLE.com', 'test1@example.com'],
        ['Test2@Example.com', 'Test2@example.com'],
        ['TEST3@EXAMPLE.COM', 'TEST3@example.com'],
        ['test4@example.COM', 'test4@example.com']
    ]
    for email, expected in sample_emails:
        user = get_user_model().objects.create_user(email, 'sample123')
        assert user.email == expected

@pytest.mark.django_db
def test_new_user_without_email_raises_error():
    """Test that creating a user without an email raises a ValueError"""
    with pytest.raises(ValueError):
        get_user_model().objects.create_user('', 'test123')

@pytest.mark.django_db
def test_create_superuser():
    """Test creating a superuser"""
    user = get_user_model().objects.create_superuser(
        'tests@example.com',
        'test123',
    )
    
    assert user.is_superuser
    assert user.is_staff


@pytest.mark.django_db
def test_user_bucketlist_creation():
    # 这个测试是为了确保当创建用户时，也会自动创建一个空的Bucketlist。
    email = "test2@example.com"
    user = User.objects.create_user(email=email, password="testpassword2")
    bucketlist = UserBucketlist.objects.get(user=user)
    assert bucketlist is not None

@pytest.mark.django_db
def test_predict_poi_creation():
    poi = POI.objects.create(
        name="Sample POI",
        longitude=10.0,
        latitude=20.0,
        zone="Sample Zone",
        geometry="Sample Geometry"
    )
    predict_poi = PredictPOI.objects.create(
        poi=poi,
        time=datetime.now(),
        busylevel=5.0
    )
    assert predict_poi.poi == poi

@pytest.mark.django_db
def test_taxi_zone_creation():
    taxi_zone = TaxiZone.objects.create(
        some_id=1,
        objectid=2,
        location_id=3,
        zone="Sample Zone",
        borough="Sample Borough"
    )
    assert taxi_zone.zone == "Sample Zone"


@pytest.mark.django_db
def test_poi_creation():
    poi = POI.objects.create(
        name="Sample POI",
        longitude=10.0,
        latitude=20.0,
        zone="Sample Zone",
        geometry="Sample Geometry",
        rating=4.5
    )
    assert poi.name == "Sample POI"
    assert poi.longitude == 10.0


@pytest.mark.django_db
def test_poi_image_creation():
    poi = POI.objects.create(name="Sample POI", longitude=10.0, latitude=20.0, zone="Sample Zone",
                             geometry="Sample Geometry", rating=4.5)
    poi_image = POIImage.objects.create(poi=poi, imageID=1)

    assert poi_image.poi == poi
    assert poi_image.imageID == 1

@pytest.mark.django_db
def test_predict_poi_creation():
    poi = POI.objects.create(name="Sample POI", longitude=10.0, latitude=20.0, zone="Sample Zone", geometry="Sample Geometry", rating=4.5)
    predict_poi = PredictPOI.objects.create(
        poi=poi,
        time=datetime.datetime.now(),
        busylevel=5.0
    )
    assert predict_poi.poi == poi


@pytest.mark.django_db
def test_user_bucketlist_item_creation():
    user = User.objects.create_user(email="test3@example.com", password="testpassword3")
    poi = POI.objects.create(name="Sample POI", longitude=10.0, latitude=20.0, zone="Sample Zone",
                             geometry="Sample Geometry", rating=4.5)

    bucketlist_item = UserBucketlistItem.objects.create(user=user, poi=poi, planned_time=datetime.datetime.now())
    assert bucketlist_item.user == user
    assert bucketlist_item.poi == poi
