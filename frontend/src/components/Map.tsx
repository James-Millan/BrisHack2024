// eslint-disable-next-line
import {useRef, useState, useEffect} from "react";
import mapboxgl from "mapbox-gl";
import {Box} from "@mui/material";
import SpotifyWebApi from "spotify-web-api-js";

mapboxgl.accessToken = 'pk.eyJ1Ijoicm0yMDU0NCIsImEiOiJjbHQxczFlemgxZXI2MnFwMm1oaXBhNThyIn0.aMyOcZ5C5K65Xe-GGm8mGg';


// function convertLegsToFormat(legs: any) {
//     let fin = [];
//     let colours = ["#1DB954", "#008F84", "#005F74"];
//     for (let i = 0; i < legs.length; i++){
//         let temp = {
//             "color": colours[i % colours.length],
//             // @ts-ignore
//             "points": legs[i]["points"],
//             "imageURI": legs[i]["track"]["id"]
//         }
//         fin.push(temp);
//     }
//     return fin;
//
// }

function convertLegsToFormat(legs: any) {
    let fin = [];
    let colours = ["#1DB954", "#23e768", "#13833f"];

    for (let i = 0; i < legs.length; i++) {
        let temp = {
            "color": colours[i % 3],
            // @ts-ignore
            "points": legs[i]["points"],
            "trackID": legs[i]["track"]["id"]
        }

        fin.push(temp);
    }
    return fin;

}

const Map = ({Token, APIData}: { APIData: any, Token: string | null }) => {
    const mapContainer = useRef<any>(null);
    const map = useRef<mapboxgl.Map | null>(null);
    const [lng, setLng] = useState(-2.600604308601162);
    const [lat, setLat] = useState(51.45935278317907);
    const [zoom, setZoom] = useState(15);

    const colouredRoute: object[] = convertLegsToFormat(APIData["legs"])

    const spotifyApi = new SpotifyWebApi();
    spotifyApi.setAccessToken(Token);

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

            let minBoundsLat : number = 90; // lng lat
            let minBoundsLng : number = 180; // lng lat
            let maxBoundsLat : number = -90; // lng lat
            let maxBoundsLng : number = -180; // lng lat

            let maxBound : [number, number] = [-360, -360]; // lng lat

            console.log(colouredRoute)
            for (let i = 0; i < colouredRoute.length; i++){
                // @ts-ignore
                for (let j = 0; j < colouredRoute[i]["points"].length; j++) {
                    // @ts-ignore
                    minBoundsLng = Math.min(colouredRoute[i]["points"][j][1], minBoundsLng)
                    // @ts-ignore
                    minBoundsLat = Math.min(colouredRoute[i]["points"][j][0], minBoundsLat)
                    // @ts-ignore
                    maxBoundsLng = Math.max(colouredRoute[i]["points"][j][1], maxBoundsLng)
                    // @ts-ignore
                    maxBoundsLat = Math.max(colouredRoute[i]["points"][j][0], maxBoundsLat)
                    // @ts-ignore
                }
            }

            minBoundsLat -= 0.01;
            minBoundsLng -= 0.01;
            maxBoundsLat += 0.01;
            maxBoundsLng += 0.01;

            map.current.fitBounds(new mapboxgl.LngLatBounds([minBoundsLng, minBoundsLat], [maxBoundsLng, maxBoundsLat]));


            for (let i = 0; i < colouredRoute.length; i++) {
                // add point using code below, should probs be a map funtion
                // @ts-ignore
                let id = colouredRoute[i]["trackID"];
                if (id == "-1"){
                    continue
                }
                // @ts-ignore
                let point = colouredRoute[i]["points"][0];

                let albumInfo = null;
                let albumName = null;
                let albumCoverUrl = null; // URL of the album cover art

                spotifyApi.getTrack(id).then(trackData => {
                    // Extract relevant details from the trackData
                    albumInfo = trackData.album;
                    albumName = albumInfo.name;
                    albumCoverUrl = albumInfo.images[albumInfo.images.length - 1].url; // URL of the album cover art

                    console.log(albumCoverUrl)
                    const el = document.createElement('div');
                    el.className = 'mapbox-marker';
                    el.style.backgroundImage = `url('${albumCoverUrl}')`;
                    el.addEventListener("mouseenter", () => el.style.transform += "scale(1.5)");
                    el.addEventListener("mouseleave", () => {
                        el.style.transform = el.style.transform.replaceAll("scale(1.5)", "");
                    });
                    if (map.current instanceof mapboxgl.Map) {
                        const marker = new mapboxgl.Marker(el)
                            .setLngLat([point[1], point[0]])
                            .addTo(map.current);
                    }
                })
                    .catch(error => {
                        console.error('Error fetching track data:', error);
                    });


            }
        });
    });


    return (
        <Box width={"100%"} height={"100%"}>
            <div ref={mapContainer} className="map-container h-[100%]"/>
        </Box>
    );
}

export default Map;