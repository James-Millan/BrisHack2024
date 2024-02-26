import haversine
import map_service


def merge(distance, points, playlist):
    """Merges the map response with the playlist response."""

    # print("\nINPUT POINTS: ", points, "\n")
    # print("HELLO")

    distance_q = song_distances(playlist, distance)
    assert len(distance_q) == len(playlist)

    running_distance = 0
    legs = []
    curr_points = []

    i = 1
    while i < len(points):

        # If there are no more songs to play, return the legs
        if len(distance_q) == 0:
            return legs
    
        # Compute haversine distance between the two points
        diff = haversine.haversine(points[i - 1], points[i], unit=haversine.Unit.METERS)
        running_distance += diff
        
        if distance_q[0] < running_distance:

            overshoot = running_distance - distance_q[0]
            to_cover = diff - overshoot
            proportion = to_cover / diff

            # print("INTERPOLATING: ", points[i-1], points[i], proportion)

            point = map_service.lerp_between_two_points(points[i-1][0], points[i-1][1], points[i][0], points[i][1], proportion)

            # print("\nNEW POINT: ", point, "\n")
            curr_points.append(point)
            points.insert(i, point)

            # print("\nPOINTS: ", curr_points, "\n")
            
            # Create a new leg and add it
            leg = {
                "track": {
                    "id": playlist[0][0],
                    "duration": playlist[0][1]
                },
                "points": curr_points
            }
            legs.append(leg)

            # Reset
            playlist.pop(0)
            distance_q.pop(0)
            curr_points = []
            running_distance = 0
            i -= 1

        else:
            # Track continues playing past this point
            curr_points.append(points[i])

        i += 1

    # Distance finished short
    if (len(distance_q) > 0):
        # Add the final leg
        leg = {
            "track": {
                "id": playlist[0][0],
                "duration": playlist[0][1]
            },
            "points": curr_points
        }
        legs.append(leg)

    return legs


def song_distances(playlist, target_distance):
    """Calculates the distance between each song in the playlist."""
    
    distances = [] 
    # log the playlist in flask
    print(playlist)

    total_duration = sum(map(lambda track: track[1], playlist))

    for track in playlist:
        distances.append((track[1] / total_duration) * target_distance)
    
    return distances
