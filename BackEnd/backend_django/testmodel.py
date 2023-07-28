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


model_with_pycaret = load_model(r'G:\Users\98692\Documents\GitHub\comp47360\COMP47360\Data\transport_random_forest')


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
    'trip_distance':[10]
}
data2 = {
    'LocationID': [87],
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
    'trip_distance':[10]
}

data3 = {
    'LocationID': [103],
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
    'trip_distance':[10]
}

data4 = {
    'LocationID': [117],
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
    'trip_distance':[10]
}

# 使用字典创建一个 DataFrame
df1 = pd.DataFrame(data1)
df2 = pd.DataFrame(data2)
df3 = pd.DataFrame(data3)
df4 = pd.DataFrame(data4)

# 使用模型进行预测

for step in model_with_pycaret.steps:
    print(step)



predictions1 = model_with_pycaret.predict(df1)
predictions2 = model_with_pycaret.predict(df2)
predictions3 = model_with_pycaret.predict(df3)
predictions4 = model_with_pycaret.predict(df4)

print(predictions1)
print(predictions2)
print(predictions3)
print(predictions4)
