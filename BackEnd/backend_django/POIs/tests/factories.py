import factory
from nybusy.models import POI
from django.contrib.auth.models import User

class UserFactory(factory.django.DjangoModelFactory):
    class Meta:
        model = User

    username = factory.Sequence(lambda n: f"user{n}")
    password = factory.PostGenerationMethodCall('set_password', 'password')

class POIFactory(factory.django.DjangoModelFactory):
    class Meta:
        model = POI


    name = factory.Faker('name')
