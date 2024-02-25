import os
import requests
import json
import polyline
import urllib
from dotenv import load_dotenv


# Load mapbox api key
load_dotenv(".env.mapbox")


MAPBOX_API_URL = "https://api.mapbox.com/styles/v1/mapbox"
DEFAULT_STYLE = "streets-v12"
DEFAULT_ZOOM = 12
RESOLUTION = 800
API_KEY = os.environ.get("MAPBOX_API_KEY")
LINE_COLOUR = "ff0000"
MARKER_COLOUR = "000000"


# For testing
MVB_LAT = 51.4560
MVB_LNG = -2.6046
POINTS = [(51.458630, -2.603818), (51.45825, -2.60374), (51.45732, -2.60372), (51.45697, -2.60358)]


def create_polyline(points):
    """Creates a polyline encoded as a URI from a list of tuples representing (lng, lat) coordinates."""

    line = polyline.encode(points)
    uri = urllib.parse.quote(line)
    return uri


def create_path(polyline):
    """Creates a path from a polyline."""

    path = f"path-5+{LINE_COLOUR}-0.5({polyline})"
    return path


def create_markers(points):
    """Creates markers at the start and end of the points representing the polyline."""

    start_marker = f"pin-s-a+{MARKER_COLOUR}({points[0][1]},{points[0][0]})"
    end_marker = f"pin-s-b+{MARKER_COLOUR}({points[-1][1]},{points[-1][0]})"
    return start_marker, end_marker


def generate_static_map(lat, lng, overlay=""):
    """Generates a map centered at the current location."""

    if overlay != "":
        url = f"{MAPBOX_API_URL}/{DEFAULT_STYLE}/static/{overlay}/auto/{RESOLUTION}x{RESOLUTION}?access_token={API_KEY}"
    else:
        url = f"{MAPBOX_API_URL}/{DEFAULT_STYLE}/static/{lng},{lat},{DEFAULT_ZOOM},0,0/{RESOLUTION}x{RESOLUTION}?access_token={API_KEY}"

    response = requests.get(url)
    if response.status_code != 200:
        print(f"Error generating map: {response.status_code}")
        return None
    else:
        return response.content


def save_to_file(bytearray, path):
    """Saves the static map image to a file. Used for testing."""

    with open(path, "wb") as f:
        f.write(bytearray)


if __name__ == "__main__":
    encoded_polyline = create_polyline(POINTS)
    route = create_path(encoded_polyline)
    start_marker, end_marker = create_markers(POINTS)
    overlay = ",".join([start_marker, end_marker, route])

    map = generate_static_map(MVB_LAT, MVB_LNG, overlay)
    if map:
        save_to_file(map, "test-map.png")


