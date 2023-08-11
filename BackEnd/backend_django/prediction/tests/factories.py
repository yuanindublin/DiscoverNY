import factory
from nybusy.models import TaxiZone, PredictZone

class TaxiZoneFactory(factory.django.DjangoModelFactory):
    class Meta:
        model = TaxiZone

    some_id = factory.Sequence(lambda n: n)
    objectid = factory.Sequence(lambda n: n + 1)
    location_id = factory.Sequence(lambda n: n + 2)
    zone = "Test Zone"
    borough = "Test Borough"

class PredictZoneFactory(factory.django.DjangoModelFactory):
    class Meta:
        model = PredictZone

    location_id = factory.SubFactory(TaxiZoneFactory)
    time = factory.Faker('date_time_this_decade')
    busylevel = 0.5
    time_index = 1
    busyindex = "Test BusyIndex"
