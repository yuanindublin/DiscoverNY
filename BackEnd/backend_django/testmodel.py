# import pickle
#
# # Replace the path below with your model's path
# with open(r'G:\Users\98692\Documents\GitHub\comp47360\COMP47360\Data\random_forest.pkl', 'rb') as f:
#     model = pickle.load(f)
#
# # Print the type of the loaded object
# print(type(model))
#
import Data
import pandas as pd
from pycaret.regression import load_model


model_with_pycaret = load_model(r'G:\Users\98692\Documents\GitHub\comp47360\COMP47360\Data\taxi_random_forest')


data1 = {
    'LocationID': [234],
    'temperature_2m (°C)': [20],
    'relativehumidity_2m (%)': [30],
    'dewpoint_2m (°C)': [10],
    'apparent_temperature (°C)': [22],
    'precipitation (mm)': [0],
    'rain (mm)': [0],
    'snowfall (cm)': [0],
    'cloudcover (%)': [10],
    'month': [7],
    'dayofweek': [2],
    'hour': [14],
    'time': [14],


}



train_columns = ['LocationID', 'temperature_2m (°C)', 'relativehumidity_2m (%)', 'dewpoint_2m (°C)', 'apparent_temperature (°C)', 'precipitation (mm)', 'rain (mm)', 'snowfall (cm)', 'cloudcover (%)', 'month', 'dayofweek', 'hour', 'time']



df1 = pd.DataFrame(data1)



# df1 = df1[train_columns]



for step in model_with_pycaret.steps:
    print(step)



predictions1 = model_with_pycaret.predict(df1)

print(predictions1)

