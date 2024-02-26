// eslint-disable-next-line
import { useRef, useState, useEffect } from "react";
import mapboxgl from "mapbox-gl";
import {Box} from "@mui/material";

mapboxgl.accessToken = 'pk.eyJ1Ijoicm0yMDU0NCIsImEiOiJjbHQxczFlemgxZXI2MnFwMm1oaXBhNThyIn0.aMyOcZ5C5K65Xe-GGm8mGg';


function convertLegsToFormat(legs: any) {
    let fin = [];
    for (let i = 0; i < legs.length; i++){
        let temp = {
            "color": "#1DB954",
        // @ts-ignore
            "points": legs[i]["points"],
            "imageURI": legs[i]["track"]["id"]
        }
        fin.push(temp);
    }
    return fin;

}

const Map = ({APIData} : {APIData : any}) => {
    const mapContainer = useRef<any>(null);
    const map = useRef<mapboxgl.Map | null>(null);
    const [lng, setLng] = useState(-2.600604308601162);
    const [lat, setLat] = useState(51.45935278317907);
    const [zoom, setZoom] = useState(15);

    const colouredRoute : object[] = convertLegsToFormat(APIData["legs"])

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
                    // @ts-ignore
                    'features': colouredRoute.map(({color, points}) => {
                        return {
                            'type': 'Feature',
                            'properties': {'color': color},
                            'geometry': {
                                'type': 'LineString',
                                'coordinates': points.map((n: any[]) => [n[1], n[0]])
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


            // for (let i = 0; i < colouredRoute.length; i++){
            //     // add point using code below, should probs be a map funtion
            //     let url = colouredRoute[i]["imageURL"];
            //     let point = colouredRoute[i]["points"][0];
            //      add the code from below in here when we have routes

            // }

            const el = document.createElement('div');
            el.className = 'mapbox-marker';
            el.style.backgroundImage = "url('https://i.scdn.co/image/ab67616d00001e02ff9ca10b55ce82ae553c8228')";
            el.addEventListener("mouseenter", () => el.style.transform += "scale(1.3)");
            el.addEventListener("mouseleave", () => {
                el.style.transform = el.style.transform.replaceAll("scale(1.3)", "");
            });
            const marker = new mapboxgl.Marker(el)
                .setLngLat([-2.601502684146389, 51.460423425462594])
                .addTo(map.current);

        });
    });

    return (
        <Box width={"100%"} height={"100%"}>
            <div ref={mapContainer} className="map-container h-[100%]" />
        </Box>
    );
}

export default Map;