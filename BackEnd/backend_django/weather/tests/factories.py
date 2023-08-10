import factory
from nybusy.models import WeatherData

class WeatherDataFactory(factory.django.DjangoModelFactory):
    class Meta:
        model = WeatherData