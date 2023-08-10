import os
import django
import requests
import time
from datetime import datetime

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'backend_django.settings')  # Replace 'your_project_name' with your project's name
django.setup()

from nybusy.models import WeatherData




def get_weather_data():
    url = "https://api.open-meteo.com/v1/forecast?latitude=40.7834&longitude=-73.9663&hourly=temperature_2m,relativehumidity_2m,dewpoint_2m,apparent_temperature,precipitation_probability,rain,snowfall,cloudcover&forecast_days=1"

    try:
        response = requests.get(url)
        response.raise_for_status()  # Raise an exception if the HTTP request returned an unsuccessful status code
    except requests.exceptions.RequestException as e:
        print(f"Request failed: {e}")
        return

    try:
        data = response.json()
    except ValueError as e:
        print(f"Error decoding JSON: {e}")
        return

    hourly_data = data.get("hourly", {}).get("time", [])
    temperature_data = data.get("hourly", {}).get("temperature_2m", [])
    humidity_data = data.get("hourly", {}).get("relativehumidity_2m", [])
    dewpoint_data = data.get("hourly", {}).get("dewpoint_2m", [])
    apparent_temperature_data = data.get("hourly", {}).get("apparent_temperature", [])
    precipitation_probability_data = data.get("hourly", {}).get("precipitation_probability", [])
    rain_data = data.get("hourly", {}).get("rain", [])
    snowfall_data = data.get("hourly", {}).get("snowfall", [])
    cloudcover_data = data.get("hourly", {}).get("cloudcover", [])

    print(data)

    for i in range(len(hourly_data)):
        try:
            time_data = datetime.fromisoformat(hourly_data[i])
        except ValueError as e:
            print(f"Error converting time data: {hourly_data[i]}")
            print(e)
            continue

        temperature = temperature_data[i]
        humidity = humidity_data[i]
        dewpoint = dewpoint_data[i]
        apparent_temperature = apparent_temperature_data[i]
        precipitation_probability = precipitation_probability_data[i]
        rain = rain_data[i]
        snowfall = snowfall_data[i]
        cloudcover = cloudcover_data[i]

        weather_data = WeatherData(
            time=time_data,
            temperature=temperature,
            humidity=humidity,
            dewpoint=dewpoint,
            apparent_temperature=apparent_temperature,
            precipitation_probability=precipitation_probability,
            rain=rain,
            snowfall=snowfall,
            cloudcover=cloudcover
        )
        try:
            weather_data.save()
        except Exception as e:
            print(f"Error saving data to database: {e}")

while True:
    get_weather_data()
    time.sleep(4 * 60 * 60)  # 4 hours in seconds
