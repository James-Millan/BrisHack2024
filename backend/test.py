import map_service as map
import playlist_gen as music
import merger_service as merger

if __name__ == "__main__":

    body = {
        "lat": 51.4560,
        "lng": -2.6046,
        "runType": "run",
        "distance": 5000,
        "apiKey": ""
    }

    lat = body.get('lat')
    lng = body.get('lng')
    run_type = body.get('runType')
    distance = body.get('distance')
    apiKey = body.get('apiKey')

    # TODO: Compute duration based on run type
    duration = distance / 3.78

    # Get songs from Spotify and create a playlist
    songs = music.get_liked_songs(apiKey)
    playlist = music.generate_playlist(songs, duration,2, apiKey)
    playlist_id = music.create_playlist(apiKey, playlist)

    # Call the map service
    map_response = map.create_route(float(lat), float(lng), int(distance))

    # Merge the map and Spotify response
    legs = merger.merge(distance, map_response["points"], playlist)

    print({
        "distance": distance,
        "legs": legs,
        "playlistId": playlist_id
    })