import pickle
import pandas as pd
from django_pandas.io import read_frame
from nybusy.models import WeatherData, POI, PredictPOI

# Query your database using Django ORM
queryset = WeatherData.objects.all('time','temperature', 'humidity', 'dewpoint', 'apparent_temperature', 'precipitation_probability', 'rain', 'snowfall', 'cloudcover')  # change this to your actual query

# Convert the queryset to pandas DataFrame
newData = read_frame(queryset)

# load the trained model

with open(r'G:\Users\98692\Documents\GitHub\comp47360\COMP47360\Data\trainedModel.pickle', 'rb') as file:
    trainedModel = pickle.load(file)

# get the components
rf_regressor = trainedModel['model']
continuousFeatures = trainedModel['continuousFeatures']
categorialFeatures = trainedModel['categorialFeatures']
scaler = trainedModel['scaler']

# separate the continuous and categorical columns
newData_cont = newData[continuousFeatures]
newData_cat = newData[categorialFeatures]

# normalize the continuous columns
newData_cont_scaled = scaler.transform(newData_cont)
newData_cont_scaled = pd.DataFrame(newData_cont_scaled, columns=continuousFeatures)

# encode the categorical columns
newData_cat_encoded = pd.get_dummies(newData_cat)

# merge the continuous columns and categorical columns
newData_preprocessed = pd.concat([newData_cont_scaled, newData_cat_encoded], axis=1)

# predict the target
predicted_values = rf_regressor.predict(newData_preprocessed)

# now `predicted_values` holds the predicted target values for your new data
