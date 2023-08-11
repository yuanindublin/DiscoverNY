import pandas as pd
import time as time_module
import logging
from django.core.management.base import BaseCommand
from nybusy.models import WeatherData, PredictZone, TaxiZone,PredictPOI
import sklearn



logging.basicConfig(filename=r'zone_prediction.log', level=logging.INFO, format='%(asctime)s - %(message)s')


def predict_taxi_busyness(data, model_path):
    import pickle
    with open(model_path, 'rb') as file:
        trainedModel = pickle.load(file)

    model = trainedModel['model']
    continuousFeatures = trainedModel['continuousFeatures']
    categorialFeatures = trainedModel['categorialFeatures']
    X_train_cat_encoded_columns = trainedModel['X_train_cat_encoded_columns']
    scaler = trainedModel['scaler']

    data_cont = data[continuousFeatures]
    data_cont_scaled = scaler.transform(data_cont)
    data_cont_scaled = pd.DataFrame(data_cont_scaled, columns=continuousFeatures)

    for column in categorialFeatures:
        data[column] = data[column].astype(str)

    def uniformEncoding(X_train_cat_encoded_columns, X_new_cat):
        X_new_cat_encoded = pd.get_dummies(X_new_cat, dtype=int, drop_first=True)
        missed_cols = set(X_train_cat_encoded_columns) - set(X_new_cat_encoded.columns)
        for col in missed_cols:
            X_new_cat_encoded[col] = 0
        X_new_cat_encoded = X_new_cat_encoded[X_train_cat_encoded_columns]
        return X_new_cat_encoded

    data_cat = data[categorialFeatures]
    data_cat_encoded = uniformEncoding(X_train_cat_encoded_columns, data_cat)

    data_preprocessed = pd.concat([data_cont_scaled, data_cat_encoded], axis=1)

    predictions = model.predict(data_preprocessed)

    return predictions


class Command(BaseCommand):
    help = 'Predict the busyness of taxi zones based on weather'

    def get_features(self, zones):
        data = WeatherData.objects.all().values('time')
        df = pd.DataFrame.from_records(data)
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
                row_data.append(zone)
                x_features.append(row_data)
                LocationID.append(zone)
                times.append(row['time'])
        df_x_features = pd.DataFrame(x_features, columns=df.columns.tolist() + ['LocationID'])
        df_x_features = df_x_features[['LocationID', 'time', 'month', 'dayofweek', 'hour']]
        return df_x_features, LocationID, times

    def handle(self, *args, **kwargs):
        while True:
            logging.info("Starting prediction cycle...")
            PredictPOI.objects.all().delete()
            poi_id = list(range(1, 209))

            df, Locations, times = self.get_features(poi_id)
            model_path = r'G:\Users\98692\Documents\GitHub\comp47360\NEW\COMP47360\Data\trainedModel_taxiBusy_40_40.pickle'
            predictions = predict_taxi_busyness(df, model_path)

            # 获取busyness的分位数
            with open(model_path, 'rb') as file:
                busyness = pickle.load(file)['busyness']
            percentiles = get_percentiles(busyness)

            for idx in range(len(predictions)):
                i = predictions[idx]
                location = Locations[idx]
                time = times[idx]
                if i < percentiles[30]:
                    busy_index = 'not busy'
                elif percentiles[30] <= i < percentiles[70]:
                    busy_index = 'a little busy'
                else:
                    busy_index = 'very busy'
                prediction_data = PredictPOI()
                prediction_data.time = time
                prediction_data.time_index = time.hour + 1
                prediction_data.busylevel = i
                prediction_data.location_id = zone_data
                prediction_data.busyindex = busy_index
                prediction_data.save()
            logging.info("Prediction cycle completed.")
            time_module.sleep(24 * 60 * 60)
