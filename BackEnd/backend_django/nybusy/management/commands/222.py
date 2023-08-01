from django.core.exceptions import ObjectDoesNotExist
from nybusy.models import POI, TaxiZone
from django.core.management.base import BaseCommand
from django.db import connection
import csv

def reset_sequence(model):
    table_name = model._meta.db_table
    with connection.cursor() as cursor:
        cursor.execute(f"SELECT setval(pg_get_serial_sequence('{table_name}', 'id'), 1, false);")

class Command(BaseCommand):
    help = 'Load POI data from csv file into the database'

    def handle(self, *args, **options):
        # Reset the ID sequence before inserting new data
        reset_sequence(POI)

        with open(r'G:\Users\98692\Documents\GitHub\comp47360\NEW\COMP47360\Data\final_poi_database_format.csv', encoding='ISO-8859-1') as csvfile:
            reader = csv.DictReader(csvfile)
            for row in reader:
                location_id = int(row['location_id'])
                try:
                    location = TaxiZone.objects.get(location_id=location_id)
                except ObjectDoesNotExist:
                    print(f"TaxiZone with location_id {location_id} does not exist.")
                    continue
                poi = POI(
                    addr_city=row['addr:city'],
                    addr_housenumber=row['addr:housenumber'],
                    addr_postcode=row['addr:postcode'],
                    addr_street=row['addr:street'],
                    description=row['description'],
                    name=row['name'],
                    opening_hours=row['opening_hours'],
                    tags=row['tags'],
                    website=row['website'],
                    longitude=float(row['longitude']),
                    latitude=float(row['latitude']),
                    location_id=location,
                    zone=row['zone'],
                    geometry=row['geometry'],
                    rating=float(row['rating'])
                )
                poi.save()
