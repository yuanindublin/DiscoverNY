import pickle
import pandas as pd
import datetime
from data_format import get_data_taxi_only, get_data_taxi_subway
from BackEnd.backend_django.nybusy.models import WeatherData, PredictZone



def store_predictions(predictions, DOLocations, times):
    for prediction, DOLocation, time in zip(predictions, DOLocations, times):
        predicted_data = PredictZone()
        predicted_data.DOLocation = DOLocation
        predicted_data.time = time
        predicted_data.prediction = prediction
        predicted_data.save()


def predict_weather():
    # Load the model
    with open('Data/random_forest_model.pkl', 'rb') as f:
        model = pickle.load(f)

    # Get the data
    df_taxi_only = get_data_taxi_only()
    df_taxi_subway = get_data_taxi_subway()

    df = df_taxi_only + df_taxi_subway

    # Prepare the data
    df = pd.DataFrame(df, columns=["DOLocation", "temperature", "humidity", "dewpoint", "apparent_temperature", "precipitation_probability",
                                    "rain", "snowfall", "cloudcover", "month", "dayofweek", "hour", "time"])

    # Make the prediction
    predictions = model.predict(df.drop(["DOLocation", "time"], axis=1))

    # Store the predictions in the database
    DOLocations = df['DOLocation'].values
    times = df['time'].values
    store_predictions(predictions, DOLocations, times)

    return predictions

