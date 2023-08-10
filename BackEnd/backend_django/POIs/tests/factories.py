import factory
from nybusy.models import POI, TaxiZone
from django.contrib.auth.models import User

class TaxiZoneFactory(factory.django.DjangoModelFactory):
    class Meta:
        model = TaxiZone

    some_id = factory.Sequence(lambda n: n)
    shape_area = factory.Faker('pyfloat')
    objectid = factory.Sequence(lambda n: n)
    shape_leng = factory.Faker('pyfloat')
    location_id = factory.Sequence(lambda n: n)
    zone = factory.Faker('city')
    borough = factory.Faker('city')
    geometry = "POINT(30 10)"
    twenty_five_percentile = factory.Faker('pyfloat')
    fifty_percentile = factory.Faker('pyfloat')
    seventy_five_percentile = factory.Faker('pyfloat')

class UserFactory(factory.django.DjangoModelFactory):
    class Meta:
        model = User

    username = factory.Sequence(lambda n: f"user{n}")
    password = factory.PostGenerationMethodCall('set_password', 'password')

class POIFactory(factory.django.DjangoModelFactory):
    class Meta:
        model = POI

    addr_housenumber = factory.Faker('building_number')
    addr_street = factory.Faker('street_name')
    addr_city = factory.Faker('city')
    addr_postcode = factory.Faker('postcode')
    description = factory.Faker('text')
    name = factory.Faker('name')
    opening_hours = factory.Faker('text')
    tags = factory.Faker('word')
    website = factory.Faker('url')
    longitude = factory.Faker('longitude')
    latitude = factory.Faker('latitude')
    location_id = factory.SubFactory(TaxiZoneFactory)
    zone = factory.Faker('city')
    geometry = "POINT(30 10)"
    rating = factory.Faker('pyfloat')
