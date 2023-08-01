import time
import requests
from django.core.files.base import ContentFile
from django.core.files import File
from ...models import POI, POIImage

# This is the Access Key of your application on Unsplash
unsplash_access_key = 'zDmGJ-5DlgCZdm6FP0v8JfAyKOrQvAynqgC6kImINrk'

# Get all POIs
pois = POI.objects.all()

# Keep track of the number of requests sent
request_count = 0

for poi in pois:
    # For each POI, send a request to the Unsplash API to get four images
    response = requests.get(
        'https://api.unsplash.com/search/photos',
        params={
            'query': poi.name,  # Use the name of the POI as the query keyword
            'per_page': 4,  # 4 images per page
        },
        headers={
            'Authorization': f'Client-ID {unsplash_access_key}',
        },
    )
    response.raise_for_status()

    # Get image information from the response
    photos = response.json()['results']

    # Download images
    for i, photo in enumerate(photos, start=1):
        image_response = requests.get(photo['urls']['regular'], stream=True)
        image_response.raise_for_status()

        # Create a new POIImage object and save the image
        poi_image = POIImage(poi=poi, imageID=i)
        poi_image.image.save(
            f'{poi.name}_{i}.jpg',  # Filename of the image
            File(ContentFile(image_response.content)),  # Content of the image
        )
        poi_image.save()

    # Increment the request count
    request_count += 1

    # If 30 requests have been sent, pause for an hour
    if request_count >= 50:
        time.sleep(3600)  # Number of seconds in an hour
        request_count = 0  # Reset the request count
