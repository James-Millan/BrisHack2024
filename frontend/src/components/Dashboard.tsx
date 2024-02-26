import {Box, Card, CircularProgress, Typography} from "@mui/material";
import React, {useEffect, useState} from "react";
import Map from "./Map";

const LoadingScreen = ({PlaylistId} : {PlaylistId : string}) => {


    return (
            <Box display={"flex"} alignItems={"center"} justifyContent={"space-evenly"} width={"100vw"} height={"100vh"}>
                <Card style={{backgroundColor:"#131313", width: '60%', height: '90%', display: "flex", flexDirection:"column", justifyContent:"space-between", padding:"2%", borderRadius:"12px"}}>
                    <Map/>
                </Card>
                <iframe
                    style={{borderRadius:"12px"}}
                    src={`https://open.spotify.com/embed/playlist/${PlaylistId}?utm_source=generator&theme=0`}
                    width="25%"
                    height="90%"
                    allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                    loading="lazy">
                </iframe>
            </Box>
    )
}

export default LoadingScreen;