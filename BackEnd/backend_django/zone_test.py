import pandas as pd
import numpy as np
import pickle

# Load your trained objects
with open(r'G:\Users\98692\Documents\GitHub\comp47360\COMP47360\Data\trainedModel.pickle', 'rb') as f:
    loaded_objects = pickle.load(f)

# Get the model and other objects from the dictionary
model = loaded_objects['model']
scaler = loaded_objects['scaler']

# Define the categorical and continuous features as per your input
categoricalFeatures = ['poi_id', 'timeWindow', 'weekday', 'holiday', 'weatherCode']
continuousFeatures = ['temperature', 'precipitation', 'windSpeed']

data = {
    'poi_id': [1],
    'timeWindow': ['00:30:00'],
    'weekday': ['Tuesday'],
    'holiday': [True],
    'weatherCode': [1],
    'temperature': [20],
    'precipitation': [0],
    'windSpeed': [3]
}

df = pd.DataFrame(data)

# Create all possible values for categorical features
all_values = {
    'poi_id': range(0, 208),  # All values from 0 to 208
    'timeWindow': [f'{h:02}:{m:02}:00' for h in range(24) for m in range(0, 60, 30)],  # All half hour intervals
    'weekday': ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],  # All weekdays
    'holiday': [True, False],
    'weatherCode': df['weatherCode'].unique()
}

# Create a DataFrame with all dummy columns for each categorical feature, add prefix
all_dummies = pd.concat([
    pd.get_dummies(pd.DataFrame({feature: all_values[feature]}), columns=[feature], prefix=[feature], dummy_na=True)
    for feature in categoricalFeatures
], axis=1)

# Create dummy variables for the input data, add prefix
df_dummies = pd.get_dummies(df, columns=categoricalFeatures, prefix=categoricalFeatures, dummy_na=True)

# Align the input data with all dummy columns
df_final, _ = all_dummies.align(df_dummies, fill_value=0)

# Separate continuous features for scaling
df_continuous = df_final[continuousFeatures]

# Scale the continuous features
df_continuous = pd.DataFrame(scaler.transform(df_continuous), columns=continuousFeatures)

# Replace the original continuous features with the scaled ones
df_final[continuousFeatures] = df_continuous

predictions = model.predict(df_final)

print(predictions)
