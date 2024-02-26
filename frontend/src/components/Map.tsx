// eslint-disable-next-line
import { useRef, useState, useEffect } from "react";
import mapboxgl from "mapbox-gl";
import {Box} from "@mui/material";

mapboxgl.accessToken = 'pk.eyJ1Ijoicm0yMDU0NCIsImEiOiJjbHQxczFlemgxZXI2MnFwMm1oaXBhNThyIn0.aMyOcZ5C5K65Xe-GGm8mGg';

const Map = () => {
    const mapContainer = useRef<any>(null);
    const map = useRef<mapboxgl.Map | null>(null);
    const [lng, setLng] = useState(-2.601502684146389);
    const [lat, setLat] = useState(51.460423425462594);
    const [zoom, setZoom] = useState(9);

    const colouredRoute = [
        {"color": "#f00", "points": [[51.45935278317907, -2.600604308601162], [51.460423425462594, -2.601502684146389], [51.460901441105875, -2.602816021332455], [51.46065874620333, -2.604192412520965]]},
        {"color": "#f0f", "points": [[51.46065874620333, -2.604192412520965], [51.4597603706581, -2.6052630548044875], [51.45844703347204, -2.6057410704477704], [51.457070642283526, -2.605498375545227]]},
        {"color": "#0ff", "points": [[51.457070642283526, -2.605498375545227], [51.456, -2.6046], [51.45552198435672, -2.6032866628139337], [51.45576467925927, -2.601910271625424]]},
        {"color": "#ff0", "points": [[51.45576467925927, -2.601910271625424], [51.456663054804494, -2.6008396293419014], [51.457976391990556, -2.6003616136986185], [51.45935278317907, -2.600604308601162]]}
    ];

    useEffect(() => {
        if (map.current) return;
        map.current = new mapboxgl.Map({
            container: mapContainer.current,
            style: 'mapbox://styles/mapbox/dark-v11',
            center: [lng, lat],
            zoom: zoom
        });
        map.current.on("load", () => {
            if (!map.current) {
                return;
            }
            map.current.addSource('route', {
                'type': 'geojson',
                'data': {
                    'type': 'FeatureCollection',
                    'features': colouredRoute.map(({color, points}) => {
                        return {
                            'type': 'Feature',
                            'properties': {'color': color},
                            'geometry': {
                                'type': 'LineString',
                                'coordinates': points.map(n => [n[1], n[0]])
                            }
                        }
                    })
                }
            });
            map.current.addLayer({
                'id': 'route',
                'type': 'line',
                'source': 'route',
                'layout': {
                    'line-join': 'round',
                    'line-cap': 'round'
                },
                'paint': {
                    'line-color': ["get", "color"],
                    'line-width': 5,
                }
            });
        });
    });

    return (
        <Box width={"100%"} height={"100%"}>
            <div ref={mapContainer} className="map-container h-[101%]" />
        </Box>
    );
}

export default Map;