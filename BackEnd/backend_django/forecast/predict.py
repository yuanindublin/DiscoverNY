import pickle
import pandas as pd
import datetime
from BackEnd.backend_django.nybusy.models import WeatherData


def predict_weather():
    # Load the model
    with open('Data/random_forest_model.pkl', 'rb') as f:
        model = pickle.load(f)

    # Get the data from the database
    data = WeatherData.objects.all().values()
    df = pd.DataFrame.from_records(data)

    # Prepare the data for prediction (make sure it has the same format as the data used to train the model)
    # ...

    # Make the prediction
    prediction = model.predict(df)

    return print(df)

predict_weather()