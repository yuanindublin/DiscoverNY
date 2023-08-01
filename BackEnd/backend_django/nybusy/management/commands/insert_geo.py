import csv
from nybusy.models import TaxiZone

with open(r'G:\Users\98692\Documents\GitHub\comp47360\NEW\COMP47360\Data\taxi_percentiles.csv', 'r') as f:
    reader = csv.reader(f)
    next(reader)  # Skip the header row
    for row in reader:
        location_id = int(row[1])  # location_id is the second column in CSV
        twenty_five_percentile = float(row[2])  # 25th_percentile
        fifty_percentile = float(row[3])  # 50th_percentile
        seventy_five_percentile = float(row[4])  # 75th_percentile

        # 更新TaxiZone模型
        try:
            tz = TaxiZone.objects.get(location_id=location_id)
            tz.twenty_five_percentile = twenty_five_percentile
            tz.fifty_percentile = fifty_percentile
            tz.seventy_five_percentile = seventy_five_percentile
            tz.save()
        except TaxiZone.DoesNotExist:
            print(f"No TaxiZone with location_id {location_id}")
