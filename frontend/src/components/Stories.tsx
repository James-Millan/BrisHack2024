import {Box, Card, CircularProgress, Grid, Typography} from "@mui/material";
import React, {Dispatch, SetStateAction, useEffect, useState} from "react";
import Map from "./Map";
import Stories from 'react-insta-stories';
import IntroSlide from "./slides/introSlide";
import DistanceSlide from "./slides/distanceSlide";
import SpotifyWebApi from 'spotify-web-api-js';
import {randomInt} from "crypto";
import InfoSlide from "./info";
import DurationSlide from "./slides/durationSlide";


const StoryPage = ({Token, APIData, setCurrentState} : {Token : string | null, APIData : any, setCurrentState : Dispatch<SetStateAction<string>>}) => {
    const slidesList = [
        {
            id: 0,
            name: "Overview",
            description: "Overview slide to contain an image of the playlist and descriptions etc",
            content: () => (

                <Box display={"flex"} justifyContent={"center"} alignItems={"center"} width={"100%"} height={"100%"}>
                    <IntroSlide/>
                </Box>
            ),
            duration: 5000,
        },
        {
            id: 1,
            name: "Overview",
            description: "Overview slide to contain an image of the playlist and descriptions etc",
            content: () => (

                <Box display={"flex"} justifyContent={"center"} alignItems={"center"} width={"100%"} height={"100%"}>
                    <InfoSlide title={"Your Playlist is almost ready!"} txt={"We've curated the songs to match the intensity of your exercise"}/>
                </Box>
            ),
            duration: 5000,
        },
        {
            id: 342452345,
            name: "Overview",
            description: "Overview slide to contain an image of the playlist and descriptions etc",
            content: () => (

                <Box display={"flex"} justifyContent={"center"} alignItems={"center"} width={"100%"} height={"100%"}>
                    <InfoSlide title={"Happy Endings!"} txt={"We've maximised the happiness of your playlist at the start and end of your run."}/>
                </Box>
            ),
            duration: 5000,
        },
        {
            id: 2,
            name: "Overview",
            description: "Overview slide to contain an image of the playlist and descriptions etc",
            content: () => (
                <Grid container justifyContent={"center"} alignItems={"center"}>
                    <DistanceSlide APIData={APIData}/>
                </Grid>
            ),
            duration: 5000,
        },
        {
            id: 14385723487590,
            name: "Overview",
            description: "Overview slide to contain an image of the playlist and descriptions etc",
            content: () => (
                <Grid container justifyContent={"center"} alignItems={"center"}>
                    <DurationSlide APIData={APIData}/>
                </Grid>
            ),
            duration: 5000,
        },
        {
            id: 8732048570983247,
            name: "Overview",
            description: "Overview slide to contain an image of the playlist and descriptions etc",
            content: () => (

                <Box display={"flex"} justifyContent={"center"} alignItems={"center"} width={"100%"} height={"100%"}>
                    <InfoSlide title={"It's Ready!"} txt={"Time to see the results, your playlist should match your run time"}/>
                </Box>
            ),
            duration: 5000,
        },
    ]

    const spotifyApi = new SpotifyWebApi();
    spotifyApi.setAccessToken(Token);

    function storyStart() {
        // spotifyApi.play({
        //     uris: [`spotify:track:${APIData["legs"][Math.floor(Math.random() * (APIData["legs"].length - 1))]["track"]["id"]}`],
        //     position_ms: 30000
        // })
    }

    function storyEnd(){
        // spotifyApi.pause()
        setCurrentState("done")
    }

    return (
        <Box display={"flex"} justifyContent={"center"} alignItems={"center"} width={"100vw"} height={"100vh"}>
            <Box display={"flex"} alignItems={"center"} justifyContent={"space-evenly"} width={"60%"} height={"90%"}>
                <Stories
                        stories={slidesList}
                        defaultInterval={1500}
                        width={"100%"}
                        height={"100%"}
                        storyContainerStyles={{backgroundColor:"#131313", borderRadius:"12px"}}
                        storyStyles={{
                            width:"100%",
                            height:"100%"
                        }}
                        onStoryStart={storyStart}
                        onAllStoriesEnd={storyEnd}
                    />
            </Box>
        </Box>
    )
}

export default StoryPage;