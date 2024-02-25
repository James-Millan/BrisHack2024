import requests


def get_liked_songs():

    finished = False
    auth_key = "ENTER AUTH KEY HERE"
    playlist_duration = 6000
    url = 'https://api.spotify.com/v1/me/tracks'
    headers = {'Authorization': f'Bearer {auth_key}', 'limit':'50'}
    liked_songs = []

    while not finished:

        # setup and send request

        response = requests.get(url, headers=headers)

        # obtain a users liked songs.
        if response.status_code == 200:
            tracks_data = response.json()
            total_time = playlist_duration * 1000
            for track in tracks_data['items']:
                # print(track)
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
            return "failure"
    return liked_songs
liked_songs = get_liked_songs()




def generate_playlist(liked_songs, duration):
    playlist = []
    total_time = duration * 1000
    if len(liked_songs) < 1:
        print("you need to like some songs to use our service!")
        return []
    for track in liked_songs:
        # print(track)
        if track[1] < total_time:
            total_time = total_time - track[1]
            playlist.append(track[0])
        else:
            print("song too long to add")
    if total_time <= 1000:
        print("successfully made a playlist! Hooray!")
        return playlist
    print(total_time)
    return playlist

print(generate_playlist(liked_songs, 10000))