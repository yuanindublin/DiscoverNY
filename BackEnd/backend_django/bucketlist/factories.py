import factory
from nybusy.models import UserBucketlist, UserBucketlistItem
from django.contrib.auth.models import User

class UserFactory(factory.django.DjangoModelFactory):
    class Meta:
        model = User

    username = factory.Sequence(lambda n: f"user{n}")
    password = factory.PostGenerationMethodCall('set_password', 'password')

class UserBucketlistFactory(factory.django.DjangoModelFactory):
    class Meta:
        model = UserBucketlist

    user = factory.SubFactory(UserFactory)

class UserBucketlistItemFactory(factory.django.DjangoModelFactory):
    class Meta:
        model = UserBucketlistItem

    user = factory.SubFactory(UserFactory)
    poi = factory.Faker('name')  # Assuming poi is a string
    planned_time = factory.Faker('future_datetime')
