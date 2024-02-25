import requests
import random


"""
NUMBERS THAT CORRESPOND TO EXERCISE TYPE:
0 - POWER WALKING 120-140 BPM
1 - JOGGING 130-150 BPM
2 - RUNNING 140 - 170 BPM
"""



auth_key = "BQA7qTganYElWRWAwnOvG46T4_wTQhx97xbIonuEABSDU_p3tJsBEfOCHJWWinRZgvbk4rBD1a4_XOESSm0IrS0VzFbM8F9i9Dnw166tBI1dVPj1jYI8QAWVvw5t4f8i8-P8gO-2b7E4wY1UyaQjNmb33dJhSjNLKN-ZGj5c5tLnBDzGED3QlDtxfGQoOhrCwLUdR_mcZvgKZHtWsWz5zqKV3rxbzL90Zhu2MXae6PNf8F5eVlCSlkSqRQqcK3r_7KIRjQ"

def get_liked_songs():

    finished = False

    url = 'https://api.spotify.com/v1/me/tracks'
    headers = {'Authorization': f'Bearer {auth_key}', 'limit':'50'}
    liked_songs = []

    while not finished:

        # setup and send request

        response = requests.get(url, headers=headers)

        # obtain a users liked songs.
        if response.status_code == 200:
            tracks_data = response.json()
            for track in tracks_data['items']:
                # if song is longer than 6:01 then don't add it. It is simply too long for a runnning playlist :-)
                if track['track']['duration_ms'] < 361000 and track['track']['id'] is not None:
                    liked_songs.append(((track['track']['id']), track['track']['duration_ms']))
            if tracks_data['next'] is not None:
                # update response and headers...
                url = tracks_data['next']
                headers = {'Authorization': f'Bearer {auth_key}'}
            else:
                finished = True

        else:
            print(f"Spotify Tracks request failed with status code: {response.status_code}")
            print(f"Error message: {response.text}")
            return []
    return liked_songs

def generate_playlist(songs, duration, type):
    bpm_low = 120
    bpm_high = 200
    # if type == 0:
    #     bpm_low = 120
    #     bpm_high = 140
    # elif type == 1:
    #     bpm_low = 130
    #     bpm_high = 150
    # else:
    #     bpm_low = 160
    #     bpm_high = 180

    playlist = []
    total_time = duration * 1000
    if len(liked_songs) < 1:
        print("you need to like some songs to use our service!")
        return []
    
    # songs = sorted(liked_songs, key= lambda x: x[1])
    random.shuffle(songs)
    for track in songs:
        if track[1] < total_time and track[1] > 0:
            info = get_song_info(track[0])
            if info['tempo'] <= bpm_high and info['tempo'] >= bpm_low:
                if info['danceability'] > 0.6 or info['energy'] > 0.6:
                    total_time = total_time - track[1]
                    playlist.append(track[0])
        if total_time < 60000:
            break
    # return URIs instead of IDs. 
    return ["spotify:track:" + item for item in playlist]

def get_user_id():
    url = "https://api.spotify.com/v1/me"
    headers = {
    "Authorization": f"Bearer {auth_key}"
    }
    response = requests.get(url, headers=headers)

    if response.status_code == 200:
        user_data = response.json()
        return user_data['id']
    else:
        print(f"Error retrieving user information: {response.status_code}")
        print(f"Error message: {response.text}")
        return None

def create_playlist(song_ids):
    playlist_data = {
    "name": "Running Playlist",
    "description": "This is a running playlist generated by a BrisHack 2024 project!",
    "public": True
    }
    id = get_user_id()
    # Set the URL and headers
    url = f"https://api.spotify.com/v1/users/{id}/playlists"
    headers = {
    "Authorization": f"Bearer {auth_key}",
    "Content-Type": "application/json"
    }


    # create playlist
    response = requests.post(url, headers=headers, json=playlist_data)
    playlist_id = 0
    snapshot_id = ""
    if response.status_code == 201:
        response_data = response.json()
        print(f"Playlist created successfully! ID: {response_data['id']}")
        playlist_id = response_data['id']
        snapshot_id = response_data['snapshot_id']
    else:
        # Handle error
        print(f"Error creating playlist: {response.status_code}")
        print(f"Error message: {response.text}")
        return

    # add all the songs

    data = {
    "uris": song_ids,
    "position": 0
    }

    url = f"https://api.spotify.com/v1/playlists/{playlist_id}/tracks"
    headers = {
    "Authorization": f"Bearer {auth_key}",
    "Content-Type": "application/json"
    }

    response = requests.post(url, headers=headers, json=data)

    # Check for successful response
    if response.status_code == 201:
        # Songs added 
        snapshot_id = response.json()['snapshot_id']
        # print("success")
    else:
        print(f"Error adding songs: {response.status_code}")
        print(f"Error message: {response.text}")
        

    # # delete the last two songs from a playlist.
    # data = {
    # "tracks": [
    #     {
    #     "uri": song_ids[-1]
    #     },
    #     {
    #     "uri": song_ids[-2]
    #     }
    # ],
    # "snapshot_id": snapshot_id
    # }

    # url = f"https://api.spotify.com/v1/playlists/{playlist_id}/tracks"
    # headers = {
    # "Authorization": f"Bearer {auth_key}",
    # "Content-Type": "application/json"
    # }
    # response = requests.delete(url, headers=headers, json=data)

    # # Check for successful response
    # if response.status_code != 200:
    #     print(f"Error deleting songs: {response.status_code}")
    #     print(f"Error message: {response.text}")

    return

def get_song_info(song_id):
        # Set the URL and headers
    url = f"https://api.spotify.com/v1/audio-features/{song_id}"
    headers = {
    "Authorization": f"Bearer {auth_key}"
    }

    # Send the GET request
    response = requests.get(url, headers=headers)

    # Check for successful response
    if response.status_code == 200:
        # Parse and print the response data
        audio_features = response.json()
        return audio_features
    else:
        # Handle error
        print(f"Error retrieving audio features: {response.status_code}")
        print(f"Error message: {response.text}")
        return

liked_songs = get_liked_songs()
playlist = generate_playlist(liked_songs, 10000, 2)
create_playlist(playlist)
