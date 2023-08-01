import csv
from django.core.exceptions import ObjectDoesNotExist
from nybusy.models import POI, TaxiZone
from django.core.management.base import BaseCommand

class Command(BaseCommand):
    help = 'Load POI data from csv file into the database'

    def handle(self, *args, **options):
        with open(r'G:\Users\98692\Documents\GitHub\comp47360\NEW\COMP47360\Data\final_poi_database_format.csv', encoding='ISO-8859-1') as csvfile:
            reader = csv.DictReader(csvfile)
            for row in reader:
                name = row['name']
                description = row['description']
                updated = POI.objects.filter(name=name).update(description=description)
                if updated == 0:
                    print(f"No POI with name {name} found.")
                else:
                    print(f"Updated {updated} POI(s) with name {name}.")
