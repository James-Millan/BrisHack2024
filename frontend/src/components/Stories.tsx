import {Box, Card, CircularProgress, Grid, Typography} from "@mui/material";
import React, {Dispatch, SetStateAction, useEffect, useState} from "react";
import Map from "./Map";
import Stories from 'react-insta-stories';
import IntroSlide from "./slides/introSlide";
import DistanceSlide from "./slides/distanceSlide";
import SpotifyWebApi from 'spotify-web-api-js';
import {randomInt} from "crypto";


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
            duration: 10000,
        },
        {
            id: 1,
            name: "Overview",
            description: "Overview slide to contain an image of the playlist and descriptions etc",
            content: () => (

                <Box display={"flex"} justifyContent={"center"} alignItems={"center"} width={"100%"} height={"100%"}>
                    <DistanceSlide APIData={APIData}/>
                </Box>
            ),
            duration: 10000,
        },
        {
            id: 2,
            name: "Overview",
            description: "Overview slide to contain an image of the playlist and descriptions etc",
            content: () => (
                <Grid container justifyContent={"center"} alignItems={"center"}>
                    <h1>Test3</h1>
                </Grid>
            ),
            duration: 10000,
        },
        {
            id: 3,
            name: "Overview",
            description: "Overview slide to contain an image of the playlist and descriptions etc",
            content: () => (
                <Grid container justifyContent={"center"} alignItems={"center"}>
                    <h1>Test3</h1>
                </Grid>
            ),
            duration: 10000,
        },
        {
            id: 4,
            name: "Overview",
            description: "Overview slide to contain an image of the playlist and descriptions etc",
            content: () => (
                <Grid container justifyContent={"center"} alignItems={"center"}>
                    <h1>Test3</h1>
                </Grid>
            ),
            duration: 10000,
        }
    ]

    const spotifyApi = new SpotifyWebApi();
    spotifyApi.setAccessToken(Token);

    function storyStart() {
        spotifyApi.play({
            uris: [`spotify:track:${APIData["legs"][Math.floor(Math.random() * (APIData["legs"].length - 1))]["track"]["id"]}`],
            position_ms: 30000
        })
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