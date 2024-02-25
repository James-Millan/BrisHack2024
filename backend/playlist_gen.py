import requests


def generate_playlist():
    # setup and send request
    auth_key = "BQBIbX7D6EjAX1JEurmpUWf7mNHO_R4s-1P4n3faEskWuC0Y01K2iDKIWhcRS6UF5NbjKk2754l1u7aX7WLwn_VY2XsHjAw4s2Sgll6zBffpqGdJVx--"+ "DzMYw9XVTlB_rYcBIT0tXDpVGmiV0DW4crTmPJ8iGbrlDPwt1ZoML64v0Loc8lGd1oqU"
    playlist_duration = 600
    url = 'https://api.spotify.com/v1/me/tracks'
    headers = {'Authorization': f'Bearer {auth_key}', 'limit': '50'}
    response = requests.get(url, headers=headers)

    # obtain a users liked songs.
    if response.status_code == 200:
        tracks_data = response.json()
        # generate a playlist that is N minutes long.
        # print(tracks_data)
        playlist = []
        total_time = playlist_duration * 1000
        for track in tracks_data['items']:
            # print(track)
            if track['track']['duration_ms'] < total_time:
                playlist_duration = total_time - track['track']['duration_ms']
                playlist.append(track['track']['id'])
        if playlist_duration <= 1000:
            print("successfully made a playlist! Hooray!")
        return playlist
    else:
        print(f"Spotify Tracks request failed with status code: {response.status_code}")
        print(f"Error message: {response.text}")
    return "failure"

print(generate_playlist())