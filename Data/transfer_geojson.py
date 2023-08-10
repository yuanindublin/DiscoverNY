import pandas as pd
from shapely import wkt
from geopandas import GeoDataFrame

# read csv
df = pd.read_csv("taxi_zones_formapbox.csv")

# check if there are NaN values in 'geometry' column
print(f"Number of NaN values in 'geometry': {df['geometry'].isna().sum()}")

# if NaN values exist, we can drop those rows
df = df.dropna(subset=['geometry'])

def test_wkt_loads(x):
    try:
        wkt.loads(x)
        return True
    except:
        return False

# Apply the test function to each row
df['valid_geometry'] = df['geometry'].apply(test_wkt_loads)

# Print rows with invalid geometry
print(df[df['valid_geometry'] == False])

# Drop rows with invalid geometry
df = df[df['valid_geometry'] == True]

df['geometry'] = df['geometry'].apply(wkt.loads)

gdf = GeoDataFrame(df, geometry='geometry')

# save to file
gdf.to_file("ready.geojson", driver='GeoJSON')
