import requests
import time

def get_weather_data():
    # Send an HTTP request and fetch JSON data
    url = "https://api.open-meteo.com/v1/forecast?latitude=40.800003&longitude=-74&hourly=temperature_2m,relativehumidity_2m"
    response = requests.get(url)
    data = response.json()

    # Extract weather data
    hourly_data = data.get("hourly", {}).get("time", [])
    temperature_data = data.get("hourly", {}).get("temperature_2m", [])
    humidity_data = data.get("hourly", {}).get("relativehumidity_2m", [])

    # Process and output data
    for i in range(len(hourly_data)):
        time = hourly_data[i]
        temperature = temperature_data[i]
        humidity = humidity_data[i]
        print(f"Time: {time}, Temperature: {temperature}°C, Relative Humidity: {humidity}%")

while True:
    get_weather_data()
    # Wait for 4 hours before fetching data again
    time.sleep(4 * 60 * 60)  # 4 hours in seconds
