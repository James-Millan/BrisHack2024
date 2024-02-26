import os
import urllib
from flask import Flask, request, send_from_directory, make_response
from flask_cors import CORS, cross_origin

import map_service as map
import playlist_gen as music
import merger_service as merger


DUMMY_RESPONSE = {
    "distance": 24500,
    "duration": 6481.481481481482,
    "legs": [
        {
            "points": [
                [
                    51.45664,
                    -2.64912
                ],
                [
                    -51.470186998546396,
                    177.3197930941065
                ]
            ],
            "track": {
                "duration": 188013,
                "id": "722tgOgdIbNe3BEyLnejw4"
            }
        },
        {
            "points": [
                [
                    -51.46241907305864,
                    177.33762306554695
                ]
            ],
            "track": {
                "duration": 298940,
                "id": "5mCPDVBb16L4XQwDdbRUpz"
            }
        },
        {
            "points": [
                [
                    -51.34287448814801,
                    177.6104814514198
                ]
            ],
            "track": {
                "duration": 218364,
                "id": "3F5CgOj3wFlRv51JsHbxhe"
            }
        },
        {
            "points": [
                [
                    51.76719081083298,
                    -3.3713193478626478
                ]
            ],
            "track": {
                "duration": 339249,
                "id": "6LNoArVBBVZzUTUiAX2aKO"
            }
        },
        {
            "points": [
                [
                    -51.571418118812055,
                    177.08630390471285
                ]
            ],
            "track": {
                "duration": 159733,
                "id": "5yJRY9n8VlzqGzOHOZHCIA"
            }
        },
        {
            "points": [
                [
                    51.49748721889066,
                    -2.7429675758371443
                ]
            ],
            "track": {
                "duration": 254453,
                "id": "0hW72l6tZgSY7Od2OUVDIC"
            }
        },
        {
            "points": [
                [
                    -51.33281622598138,
                    177.63330882187793
                ]
            ],
            "track": {
                "duration": 234288,
                "id": "6Ab81Bs9fcOwaTYuBsUUpI"
            }
        },
        {
            "points": [
                [
                    -51.41537338165159,
                    177.4453470820877
                ]
            ],
            "track": {
                "duration": 291175,
                "id": "40iJIUlhi6renaREYGeIDS"
            }
        },
        {
            "points": [
                [
                    51.433200814342676,
                    -2.5954210221657847
                ]
            ],
            "track": {
                "duration": 147668,
                "id": "1jgcODbfAL3tV7tikF6n1j"
            }
        },
        {
            "points": [
                [
                    51.4237884974795,
                    -2.573888768281012
                ]
            ],
            "track": {
                "duration": 140746,
                "id": "2aqe2NgAwmMlPgtf1MnGoy"
            }
        },
        {
            "points": [
                [
                    -51.46715895337675,
                    177.32674492461834
                ]
            ],
            "track": {
                "duration": 229670,
                "id": "51rXHuKN8Loc4sUlKPODgH"
            }
        },
        {
            "points": [
                [
                    51.449973450920005,
                    -2.6338356597566026
                ]
            ],
            "track": {
                "duration": 252069,
                "id": "7Bpx2vsWfQFBACRz4h3IqH"
            }
        },
        {
            "points": [
                [
                    51.45410871075895,
                    -2.6433154724647037
                ]
            ],
            "track": {
                "duration": 201963,
                "id": "3DKCTIiJ97bS9TGiqcABjo"
            }
        },
        {
            "points": [
                [
                    51.45410871075895,
                    -2.6433154724647037
                ],
                [
                    -51.52793519822335,
                    177.18685536160314
                ]
            ],
            "track": {
                "duration": 152612,
                "id": "1dp8aQANyTRKssDeAYPiZe"
            }
        },
        {
            "points": [
                [
                    51.483425785951034,
                    -2.710622646850287
                ]
            ],
            "track": {
                "duration": 237735,
                "id": "5yY9lUy8nbvjM1Uyo1Uqoc"
            }
        },
        {
            "points": [
                [
                    51.4645613820682,
                    -2.6672930199405385
                ]
            ],
            "track": {
                "duration": 192066,
                "id": "31G9RaSaDOI2NWcpnIp734"
            }
        },
        {
            "points": [
                [
                    -51.47299465943292,
                    177.31334555702236
                ]
            ],
            "track": {
                "duration": 240000,
                "id": "08F16baYbciTva9P4BvpiI"
            }
        },
        {
            "points": [
                [
                    51.46761087220886,
                    -2.6742924787841726
                ]
            ],
            "track": {
                "duration": 256213,
                "id": "0NfYAsKygCYwPA2BgTZ1qg"
            }
        },
        {
            "points": [
                [
                    -51.458788372242935,
                    177.34595252285104
                ]
            ],
            "track": {
                "duration": 235320,
                "id": "2wAJTrFhCnQyNSD3oUgTZO"
            }
        },
        {
            "points": [
                [
                    51.44181981926136,
                    -2.6151541513123227
                ]
            ],
            "track": {
                "duration": 336511,
                "id": "2HSmyk2qMN8WQjuGhaQgCk"
            }
        },
        {
            "points": [
                [
                    51.44773082089766,
                    -2.628696027815905
                ]
            ],
            "track": {
                "duration": 223506,
                "id": "5SkRLpaGtvYPhw02vZhQQ9"
            }
        },
        {
            "points": [
                [
                    51.547982729367654,
                    -2.8594546999230306
                ]
            ],
            "track": {
                "duration": 210937,
                "id": "343YBumqHu19cGoGARUTsd"
            }
        },
        {
            "points": [
                [
                    51.520982415766085,
                    -2.797102961147664
                ]
            ],
            "track": {
                "duration": 319066,
                "id": "1UTVkHERZzuPn9MjIDKBM8"
            }
        },
        {
            "points": [
                [
                    -51.429685759281575,
                    177.41262234972854
                ]
            ],
            "track": {
                "duration": 167915,
                "id": "527k23H0A4Q0UJN3vGs0Da"
            }
        },
        {
            "points": [
                [
                    51.42344525616973,
                    -2.5731038842803517
                ]
            ],
            "track": {
                "duration": 178153,
                "id": "3aQem4jVGdhtg116TmJnHz"
            }
        },
        {
            "points": [
                [
                    -51.46930672964021,
                    177.32181422080097
                ]
            ],
            "track": {
                "duration": 233922,
                "id": "1ZM8toCOlnfBKJdvR8GqUq"
            }
        },
        {
            "points": [
                [
                    -51.438355735566525,
                    177.39277864181602
                ]
            ],
            "track": {
                "duration": 294906,
                "id": "1DbeslBYnckTqqTcc1Y2Tg"
            }
        },
        {
            "points": [
                [
                    -51.440633214800926,
                    177.3875634606616
                ]
            ],
            "track": {
                "duration": 216013,
                "id": "5SsR3wtCOafDmZgvIdRhSm"
            }
        }
    ],
    "playlistId": "2nLEGDUH0QzRDBSwVFFdQ8"
}


app = Flask(__name__, static_folder='../frontend/build')
cors = CORS(app)


# Route non-api requests to the frontend
@app.route("/", defaults={"path": ""})
@app.route('/<path:path>')
def serve(path):
    if path != "" and os.path.exists(app.static_folder + '/' + path):
        return send_from_directory(app.static_folder, path)
    else:
        return send_from_directory(app.static_folder, 'index.html')


@app.route('/api/route', methods=['POST', 'OPTIONS'])
@cross_origin()
def route():

    if request.method == 'OPTIONS':
        return build_cors_preflight_response()

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
        "duration": duration,
        "legs": legs,
        "playlistId": playlist_id
    }


@app.route('/api/route-dummy', methods=['POST', 'OPTIONS'])
@cross_origin()
def dummy():
    if request.method == 'OPTIONS':
        return build_cors_preflight_response()
    return DUMMY_RESPONSE


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


def build_cors_preflight_response():
    response = make_response()
    response.headers.add("Access-Control-Allow-Origin", "*")
    response.headers.add("Access-Control-Allow-Headers", "*")
    response.headers.add("Access-Control-Allow-Methods", "*")
    return response


if __name__ == '__main__':
  app.run(use_reloader=True, threaded=True, host='0.0.0.0', port=80)