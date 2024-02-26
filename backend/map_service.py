import os
import requests
import json
import polyline
import urllib
import random
import math
import haversine
from dotenv import load_dotenv


# Load mapbox api key
load_dotenv(".env.mapbox")


MAPBOX_API_URL = "https://api.mapbox.com/styles/v1/mapbox"
MAPBOX_NAV_API_URL = "https://api.mapbox.com/directions/v5/mapbox"
DEFAULT_STYLE = "streets-v12"
DEFAULT_ZOOM = 12
RESOLUTION = 800
API_KEY = os.environ.get("MAPBOX_API_KEY")
LINE_COLOUR = "ff0000"
MARKER_COLOUR = "000000"
RADIUS_SCALAR = 0.12
POINTS_ON_CIRCLE = 12
CONVERSION_FACTOR = 111111  # 1 degree of latitude is approximately 111km
THRESHOLD_IN_METRES = 12 # meters


# For testing
MVB_LAT = 51.4560
MVB_LNG = -2.6046
POINTS = [(51.458630, -2.603818), (51.45825, -2.60374), (51.45732, -2.60372), (51.45697, -2.60358)]


def create_route(lat, lng, distance_in_m):
    """Creates a circular route around the given points with the given distance."""

    # Compute the radius of the circle
    radius = (distance_in_m / CONVERSION_FACTOR) * RADIUS_SCALAR
    bearing = random.randint(0, 360)

    # Calculate the coordinates of the centre of the circle at the given distance using haversine formula
    circle_lat = lat + (radius * math.sin(math.radians(bearing)))
    circle_lng = lng + (radius * math.cos(math.radians(bearing)))
    offset_angle = 360 / POINTS_ON_CIRCLE

    points = []

    for i in range(POINTS_ON_CIRCLE):
        angle = (bearing + (offset_angle * i)) % 360
        # Convert to radians
        new_lat = circle_lat + (radius * math.sin(math.radians(angle)))
        new_lng = circle_lng + (radius * math.cos(math.radians(angle)))
        
        points.append((new_lat, new_lng))

    nav_response = navigate(points)
    geometry = nav_response["geometry"]
    raw_points = polyline.decode(geometry)
    filtered_points = remove_duplicates(raw_points)

    return {
        "distance": nav_response["distance"],
        "points": filtered_points
    }


def create_polyline(points, circle=False):
    """Creates a polyline encoded as a URI from a list of tuples representing (lng, lat) coordinates."""

    if circle:
        points.append(points[0])

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


def navigate(points):
    """Navigates between the given two points."""

    stringified = ";".join([f"{p[1]},{p[0]}" for p in points])
    url = f"{MAPBOX_NAV_API_URL}/walking/{stringified}/?waypoints_per_route=true&access_token={API_KEY}"

    response = requests.get(url)
    if response.status_code != 200:
        print(f"Error navigating: {response.status_code}")
        return None
    else:
        return response.json()["routes"][0]


def remove_duplicates(points):
    """Removes duplicate points from the list of points."""

    i = 0
    while i < len(points):
        j = i + 1
        while j < len(points):

            # Compute haversine distance between the two points
            distance = haversine.haversine(points[i], points[j], unit=haversine.Unit.METERS)
            # Discard points which are too close
            if distance < THRESHOLD_IN_METRES:
                del points[i:j]

            j += 1
        i += 1

    return points


def lerp_between_two_points(lat, lng, lat2, lng2, proportion):
    """Linearly interpolates between two coordinate points on earth."""

    # using haversine
    lat = math.radians(lat)
    lng = math.radians(lng)
    lat2 = math.radians(lat2)
    lng2 = math.radians(lng2)

    d = haversine.haversine((lat, lng), (lat2, lng2), unit=haversine.Unit.METERS)
    a = proportion * d
    f = a / d

    A = math.sin((1 - f) * d) / math.sin(d)
    B = math.sin(f * d) / math.sin(d)
    x = A * math.cos(lat) * math.cos(lng) + B * math.cos(lat2) * math.cos(lng2)
    y = A * math.cos(lat) * math.sin(lng) + B * math.cos(lat2) * math.sin(lng2)
    z = A * math.sin(lat) + B * math.sin(lat2)

    lat3 = math.atan2(z, math.sqrt(x ** 2 + y ** 2))
    lng3 = math.atan2(y, x)
    
    new_lat = math.degrees(lat3)
    new_lng = math.degrees(lng3)

    if new_lat > 90:
        new_lat = new_lat - 180
    
    if new_lng > 180:
        new_lng = new_lng - 180

    return new_lat, new_lng

        

if __name__ == "__main__":

    route = create_route(MVB_LAT, MVB_LNG, 5000)
    
    uri = create_polyline(route["points"], circle=True)
    path = create_path(uri)
    overlay = ",".join([path])

    map = generate_static_map(MVB_LAT, MVB_LNG, overlay)
    if map:
        save_to_file(map, "test-map.png")


