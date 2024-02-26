import os
import urllib
from flask import Flask, request, send_from_directory

import map_service as map
import playlist_gen as music
import merger_service as merger


app = Flask(__name__, static_folder='../frontend/build')


# Route non-api requests to the frontend
@app.route("/", defaults={"path": ""})
@app.route('/<path:path>')
def serve(path):
    if path != "" and os.path.exists(app.static_folder + '/' + path):
        return send_from_directory(app.static_folder, path)
    else:
        return send_from_directory(app.static_folder, 'index.html')


@app.route('/api/route', methods=['POST'])
def route():

    # Get request body parameters
    body = request.json
    lat = body.get('lat')
    lng = body.get('lng')
    run_type = body.get('runType')
    distance = body.get('distance')
    apiKey = body.get('apiKey')

    # TODO: Compute duration based on run type
    duration = distance / 3.78

    # Get songs from Spotify and create a playlist
    songs = music.get_liked_songs(apiKey)
    playlist = music.generate_playlist(songs, duration)
    playlist_id = music.create_playlist(apiKey, playlist)

    # Call the map service
    map_response = map.create_route(float(lat), float(lng), int(distance))

    # Merge the map and Spotify response
    legs = merger.merge(distance, map_response["points"], playlist)

    return {
        "distance": distance,
        "legs": legs,
        "playlistId": playlist_id
    }


@app.route('/api/echo', methods=['GET', 'POST'])
def echo():
    print("Received request")
    print("Request url params: ", request.args)
    print("Request body: ", request.data)
    return request.data


@app.route('/api/hello', methods=['GET', 'POST'])
def hello():
    print("Received request")
    print("Request url params: ", request.args)
    print("Request body: ", request.data)
    return {
        "message": "Hello, World!"
    }


if __name__ == '__main__':
  app.run(use_reloader=True, threaded=True, host='0.0.0.0', port=80)