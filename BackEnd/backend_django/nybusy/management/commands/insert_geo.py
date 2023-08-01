import csv
from django.contrib.gis.geos import GEOSGeometry, GEOSException
from nybusy.models import TaxiZone

with open(r'G:\Users\98692\Documents\GitHub\comp47360\COMP47360\Data\0000s.csv', 'r') as f:
    reader = csv.reader(f)
    next(reader)  # Skip the header row
    for row in reader:
        location_id = int(row[0])
        geo_wkt = row[1]

        try:
            geo = GEOSGeometry(geo_wkt)
        except GEOSException:
            print(f"Invalid WKT at location_id {location_id}: {geo_wkt}")
            continue

        # 更新TaxiZone模型
        tz = TaxiZone.objects.get(location_id=location_id)
        tz.geometry = geo
        tz.save()
