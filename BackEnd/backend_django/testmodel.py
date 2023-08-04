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


model_with_pycaret = load_model(r'G:\Users\98692\Documents\GitHub\comp47360\NEW\COMP47360\Data\final_decision_tree_model')



data1 = {

    'LocationID': [234],
'time': [12],
    'month': [7],
    'dayofweek': [2],
    'hour': [14],



}



# train_columns = ['LocationID', 'temperature_2m (°C)', 'relativehumidity_2m (%)', 'dewpoint_2m (°C)', 'apparent_temperature (°C)', 'precipitation (mm)', 'rain (mm)', 'snowfall (cm)', 'cloudcover (%)', 'month', 'dayofweek', 'hour', 'time']



df1 = pd.DataFrame(data1)



# df1 = df1[train_columns]




for step in model_with_pycaret.steps:
    print(step)



predictions1 = model_with_pycaret.predict(df1)


print(predictions1)


