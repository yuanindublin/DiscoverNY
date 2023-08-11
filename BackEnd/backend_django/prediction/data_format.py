from django_pandas.io import read_frame
from BackEnd.backend_django.nybusy.models import WeatherData
import pandas as pd


taxi_only_zones = [4, 13, 50, 68, 137, 140, 158, 170, 211, 224, 233, 262, 12,
                   194, 128, 120, 103]

zones_with_subway = [24, 41, 42, 43, 45, 48, 74, 75, 79, 87, 88, 90, 100,
                     107, 113, 114, 116, 125, 127, 141, 142, 143, 144, 148, 151, 152,
                     153, 161, 162, 163, 164, 166, 186, 202, 209, 229, 230, 231, 232,
                     234, 236, 237, 238, 239, 243, 244, 246, 249, 261, 263]

def get_features(zones):

    data = WeatherData.objects.all()
    df = read_frame(data)


    df['time'] = pd.to_datetime(df['time'])
    df['month'] = df['time'].dt.month
    df['dayofweek'] = df['time'].dt.weekday
    df['hour'] = df['time'].dt.hour


    x_features = []
    DOLocations = []
    times = []


    for index, row in df.iterrows():
        temperature = row['temperature']
        humidity = row['humidity']
        dewpoint = row['dewpoint']
        apparent_temperature = row['apparent_temperature']
        precipitation_probability = row['precipitation_probability']
        rain = row['rain']
        snowfall = row['snowfall']
        cloudcover = row['cloudcover']
        month = row['month']
        dayofweek = row['dayofweek']
        hour = row['hour']
        time = row['time']

        for zone in zones:
            x_features.append(
                [zone, temperature, humidity, dewpoint, apparent_temperature, precipitation_probability,
                 rain, snowfall, cloudcover, month, dayofweek, hour])
            DOLocations.append(zone)
            times.append(time)

    return x_features, DOLocations, times
