import requests

def get_hashtag_id(tag):
    api_url = f'https://graph.facebook.com/v17.0/ig_hashtag_search?user_id={user_id}&q={tag}&access_token={access_token}'

    response = requests.get(api_url)
    data = response.json()

    if 'error' in data:
        print('Error:', data['error']['message'])
        return None

    hashtag_id = data['data'][0]['id']
    return hashtag_id


def get_recent_post_count(hashtag_id):
    api_url = f'https://graph.facebook.com/v17.0/{hashtag_id}/recent_media?user_id={user_id}&fields=id&access_token={access_token}'

    response = requests.get(api_url)
    data = response.json()

    if 'error' in data:
        print('Error:', data['error']['message'])
        return None

    post_count = len(data['data'])
    return post_count


# Tag to retrieve post count for
user_id = '976467323694454'
access_token = '3165172737110023|ayGc7VEaVA3Fkmm7HjnSJ_MCMSc'
tag = '#newyork'

# Get post count
hashtag_id = get_hashtag_id(tag)
if hashtag_id is not None:
    post_count = get_recent_post_count(hashtag_id)
    if post_count is not None:
        print(f'Post count: {post_count}')
