import requests
import random

"""
NUMBERS THAT CORRESPOND TO EXERCISE TYPE:
0 - POWER WALKING 120-140 BPM
1 - JOGGING 130-150 BPM
2 - RUNNING 140 - 170 BPM
"""

def get_liked_songs(auth_key):


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
                # print(track['track']['available_markets'])
                if track['track']['duration_ms'] < 361000 and track['track']['id'] is not None and ('GB' in track['track']['available_markets']):
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
            print(f"{response}")

            return []
    return liked_songs


# batch my queries
def batch_queries(songs, auth_key):
    # split into chunks of 100
    chunks = []
    for i in range(0, len(songs), 100):
        chunks.append(songs[i:i + 100])

    new_chunks = []
    for chunk in chunks:
        # list of pairs
        new_chunk = []
        for elem in chunk:
            new_chunk.append(elem[0])
        new_chunks.append(new_chunk)
    
    # send batched queries
    song_infos = {}
    finished = False
    # pop(0)
    while not finished:
        # print("looping...")
        if len(new_chunks) < 1:
            finished = True
            break
        batch = new_chunks.pop(0)
        
        ids = ",".join(batch)
        url = "https://api.spotify.com/v1/audio-features?ids=" + ids
        headers = {
        "Authorization": f"Bearer {auth_key}"
        }
        response = requests.get(url, headers=headers)

        if response.status_code == 200:
            # print("all okay")
            returned_song_infos = response.json()
            # print(returned_song_infos)
            for song in returned_song_infos["audio_features"]:
                song_infos[song['id']] = song


            # add each song info that is returned.
        else:
            print(f"Error retrieving audio features: {response.status_code}")
            print(f"Error message: {response.headers}")
    return song_infos

def generate_playlist(songs, duration, type, auth_key):
    bpm_low = 100
    bpm_high = 200
    if type == 0:
        bpm_low = 100
        bpm_high = 140
    elif type == 1:
        bpm_low = 120
        bpm_high = 150
    else:
        bpm_low = 130
        bpm_high = 180

    playlist = []
    song_infos = batch_queries(songs, auth_key)
    # print(len(song_infos))
    total_time = duration * 1000
    if len(songs) < 1:
        print("you need to like some songs to use our service!")
        return []
    
    # songs = sorted(liked_songs, key= lambda x: x[1])
    random.shuffle(songs)
    for i in range(len(songs)):
        # this should never happen
        track = songs[i]
        info = song_infos[track[0]]
        if track[1] < total_time and track[1] > 0:
            if info is not None:
                if info['tempo'] >= bpm_low:
                    if ((info['danceability'] > 0.8 and info['energy'] > 0.7 ) or (info['energy'] > 0.9 and info['danceability'] > 0.6) or (info['danceability'] > 0.9 and info['energy'] > 0.6)):
                        total_time = total_time - track[1]
                        print(f"bpm: {info['tempo']} dance: {info['danceability']}, energy: {info['energy']}, loudness: {info['loudness']}, valence: {info['valence']}")
                        playlist.append((track[0],info['duration_ms'], info['valence']))
            else:
                total_time = total_time - track[1]
                playlist.append((track[0], 0.0, 0.0))

        if total_time < 60000:
            break
    if total_time > 60000:
        additional_songs = get_radio_songs([],[],playlist[:5], auth_key)
        # print(len(additional_songs))
        random.shuffle(additional_songs)
        additional_song_infos = batch_queries(additional_songs, auth_key)
        for i in range(len(additional_songs)):
            # this should never happen
            track = additional_songs[i]
            info = additional_song_infos[track[0]]
            if track[1] < total_time and track[1] > 0:
                if info is not None:
                    if info['tempo'] >= 0:
                        if ((info['danceability'] > 0.7 and info['energy'] > 0.6) or info['energy'] > 0.8 or info['danceability'] > 0.8):
                            total_time = total_time - track[1]
                            print(f"bpm: {info['tempo']} dance: {info['danceability']}, energy: {info['energy']}, loudness: {info['loudness']}, valence: {info['valence']}")
                            playlist.append((track[0], info['duration_ms'], info['valence'] ))
                else:
                    total_time = total_time - track[1]
                    playlist.append((track[0], 0.0, 0))

            # if total_time < 60000:
            #     break
    
    playlist_half2 = playlist[:len(playlist)//2]
    playlist_half1 = playlist[len(playlist)//2:]

    sorted(playlist_half2, key= lambda x: float(x[2]))
    sorted(playlist_half1, key= lambda x: float(x[2]), reverse=True)

    playlist_half1.extend(playlist_half2)
    playlist = playlist_half1
   


    # return URIs instead of IDs. 
    return playlist



def get_user_id(auth_key):
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



def create_playlist(auth_key, tracks):
    playlist_data = {
    "name": "Running Playlist",
    "description": "This is a running playlist generated by a BrisHack 2024 project!",
    "public": True
    }
    id = get_user_id(auth_key)
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
        print(f"{response}")

        return

    # add all the songs
    print(tracks)

    data = {
    "uris": list(map(lambda x: "spotify:track:" + x[0], tracks)),
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
        snapshot_id = response.json()['snapshot_id']
        # print("success")
    else:
        print(f"Error adding songs: {response.status_code}")
        print(f"Error message: {response.text}")

    return playlist_id
        

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


def get_song_info(song_id, auth_key):
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
        print(f"Error message: {response.headers}")
        return None

def get_radio_songs(artists,genres,tracks, auth_key):
    url = "https://api.spotify.com/v1/recommendations"

    # Request parameters
    params = {
        "seed_artists": artists,
        "seed_genres": genres,
        "seed_tracks": tracks,
        "min_danceability": 0.8,
        "min_energy": 0.8,
    }

    # Authorization header
    headers = {
        "Authorization": f"Bearer {auth_key}", 
        "limit": "50"
    }

    # Send the GET request
    response = requests.get(url, params=params, headers=headers)

    rec_songs = []
    # Check for successful response
    if response.status_code == 200:
        # Parse the JSON response
        tracks_data = response.json()
        for track in tracks_data['tracks']:
            # print(track[])
            # if song is longer than 6:01 then don't add it. It is simply too long for a runnning playlist :-)
            # print(track['track']['available_markets'])
            if track['duration_ms'] < 361000 and track['id'] is not None and ('GB' in track['available_markets']):
                rec_songs.append(((track['id']), track['duration_ms']))
        
        # Access and process the data (tracks, artists, etc.)
        # ...
        
        print("Successfully retrieved recommendations!")
    else:
        print(f"Error: {response.status_code} {response.text}")
        print(f"{response}")
    return rec_songs

# liked_songs = get_liked_songs(api_key)
# playlist = generate_playlist(liked_songs, 1000)
# playlist_id = create_playlist(api_key, playlist)
# print(playlist_id)
