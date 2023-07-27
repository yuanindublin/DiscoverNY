import pandas as pd
from datetime import datetime
import time as time_module
import logging
from django.core.management.base import BaseCommand
from nybusy.models import WeatherData, PredictZone, TaxiZone
from pycaret.regression import load_model

# Configure logging
logging.basicConfig(filename=r'zone_prediction.log',level=logging.INFO, format='%(asctime)s - %(message)s')

class Command(BaseCommand):
    help = 'Predict the weather'

    def get_features(self, zones):
        logging.info("Fetching features...")
        # get data from database
        data = WeatherData.objects.all().values()
        df = pd.DataFrame.from_records(data)

        # rename columns to match model training names
        df = df.rename(columns={
            # 'DOLocationID': 'LocationID',
            'temperature': 'temperature_2m (°C)',
            'humidity': 'relativehumidity_2m (%)',
            'dewpoint': 'dewpoint_2m (°C)',
            'apparent_temperature': 'apparent_temperature (°C)',
            'precipitation_probability': 'precipitation (mm)',
            'rain': 'rain (mm)',
            'snowfall': 'snowfall (cm)',
            'cloudcover': 'cloudcover (%)',
        })

        # convert time column to datetime
        df['time'] = pd.to_datetime(df['time'])
        df['month'] = df['time'].dt.month
        df['dayofweek'] = df['time'].dt.weekday
        df['hour'] = df['time'].dt.hour

        x_features = []
        LocationID = []
        times = []

        for index, row in df.iterrows():
            for zone in zones:
                row_data = row.values.tolist()
                row_data.append(zone)  # Add the DOLocationID to the feature data
                row_data.append(1)  # Add 'trip_distance' to the feature data
                x_features.append(row_data)
                LocationID.append(zone)
                times.append(row['time'])

        logging.info("Finished fetching features.")

        return pd.DataFrame(x_features, columns=df.columns.tolist() + ['LocationID', 'trip_distance']), LocationID, times

    def handle(self, *args, **kwargs):
        for _ in range(1):
        # while True:
            logging.info("Starting prediction cycle...")
            # time_module.sleep(4 * 60 * 60)  # Sleep for 4 hours

            # Load the model
            logging.info("Loading the model...")
            model = load_model(r'G:\Users\98692\Documents\GitHub\comp47360\COMP47360\Data\transport_random_forest')

            # Define zones
            taxi_only_zones = [4, 13, 50, 68, 137, 140, 158, 170, 211, 224, 233, 262, 12, 194, 128, 120, 103]
            zones_with_subway = [24, 41, 42, 43, 45, 48, 74, 75, 79, 87, 88, 90, 100, 107, 113, 114, 116, 125, 127, 141, 142, 143, 144, 148, 151, 152, 153, 161, 162, 163, 164, 166, 186, 202, 209, 229, 230, 231, 232, 234, 236, 237, 238, 239, 243, 244, 246, 249, 261, 263]

            # Get the data
            df_taxi_only, DOLocations_taxi_only, times_taxi_only = self.get_features(taxi_only_zones)
            df_taxi_subway, DOLocations_taxi_subway, times_taxi_subway = self.get_features(zones_with_subway)

            # Combine the data
            df = pd.concat([df_taxi_only, df_taxi_subway])
            LocationID = DOLocations_taxi_only + DOLocations_taxi_subway
            times = times_taxi_only + times_taxi_subway


            # Make the prediction
            logging.info("Making predictions...")
            print(df.head())
            df = df.drop(['id'], axis=1)
            predictions = model.predict(df)
            print("=========================================")
            for i in predictions:
                print(i)
            print("=========================================")

            # Save the predictions
            logging.info("Saving predictions...")
            for idx in range(len(predictions)):
                i = predictions[idx]
                location = LocationID[idx]
                time = times[idx]
                print(i)
                prediction_data = PredictZone()  # Create a new instance in each loop
                prediction_data.time = time
                prediction_data.busylevel = i
                prediction_data.location_id = TaxiZone.objects.get(
                    locavtion_id=location)  # Get the TaxiZone instance with the given location_id
                prediction_data.save()

            logging.info("Prediction cycle completed.")
