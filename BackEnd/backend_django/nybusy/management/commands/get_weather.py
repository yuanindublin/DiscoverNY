from django.core.management.base import BaseCommand
import requests
import time
from datetime import datetime
from ...models import WeatherData

class Command(BaseCommand):
    help = 'Fetch weather data and store it in the database'

    def handle(self, *args, **options):
        while True:
            self.get_weather_data()
            time.sleep(4 * 60 * 60)  # 4 hours in seconds

    def get_weather_data(self):
        WeatherData.objects.all().delete()

        url = "https://api.open-meteo.com/v1/forecast?latitude=40.8&longitude=-74&hourly=temperature_2m,relativehumidity_2m,dewpoint_2m,apparent_temperature,precipitation_probability,rain,snowfall,weathercode,cloudcover,windspeed_10m&forecast_days=7"

        try:
            response = requests.get(url)
            response.raise_for_status()
        except requests.exceptions.RequestException as e:
            print(f"Request failed: {e}")
            return

        try:
            data = response.json()

            hourly_data = data.get("hourly", {}).get("time", [])
            temperature_data = data.get("hourly", {}).get("temperature_2m", [])
            humidity_data = data.get("hourly", {}).get("relativehumidity_2m", [])
            dewpoint_data = data.get("hourly", {}).get("dewpoint_2m", [])
            apparent_temperature_data = data.get("hourly", {}).get("apparent_temperature", [])
            precipitation_probability_data = data.get("hourly", {}).get("precipitation_probability", [])
            rain_data = data.get("hourly", {}).get("rain", [])
            snowfall_data = data.get("hourly", {}).get("snowfall", [])
            cloudcover_data = data.get("hourly", {}).get("cloudcover", [])
            weathercode_data = data.get("hourly", {}).get("weathercode", [])
            windspeed_data = data.get("hourly", {}).get("windspeed_10m", [])



            for i in range(len(hourly_data)):
                time_data = datetime.fromisoformat(hourly_data[i])
                temperature = temperature_data[i]
                humidity = humidity_data[i]
                dewpoint = dewpoint_data[i]
                apparent_temperature = apparent_temperature_data[i]
                precipitation_probability = precipitation_probability_data[i]
                rain = rain_data[i]
                snowfall = snowfall_data[i]
                cloudcover = cloudcover_data[i]
                weathercode = weathercode_data[i]
                windspeed = windspeed_data[i]

                weather_data = WeatherData(
                    time=time_data,
                    temperature=temperature,
                    humidity=humidity,
                    dewpoint=dewpoint,
                    apparent_temperature=apparent_temperature,
                    precipitation_probability=precipitation_probability,
                    rain=rain,
                    snowfall=snowfall,
                    cloudcover=cloudcover,
                    weathercode=weathercode,
                    windspeed=windspeed
                )
                weather_data.save()

        except KeyError as e:
            print(f"Missing key in JSON data: {e}")
        except Exception as e:
            print(f"Unexpected error: {e}")
