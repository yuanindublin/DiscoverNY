import traceback
import requests
import json
import datetime
from django_pandas.io import read_frame
from BackEnd.backend_django.nybusy.models import WeatherData

'''
get weather forecast info for model prediction
this function will return data and it's according feature lists
'''

def get_weather_forecast():
    try:
        # get data from database
        data = WeatherData.objects.all()
        df = read_frame(data)
        X_features = []
        for index, row in df.iterrows():
            dt = row['date']
            hour = dt.hour
            weekday = dt.weekday()

            temp = row['temperature_2m (°C)']
            humidity = row['relativehumidity_2m (%)']  # assuming the database provides humidity data
            # Add your other features here following the pattern above


            X_features.append([hour, temp, humidity, weekday])  # add other features to this list

        return X_features

    except:
        print(traceback.format_exc())
        return None






