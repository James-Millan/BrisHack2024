import {Box, Card, CircularProgress, Typography} from "@mui/material";
import React, {useEffect, useState} from "react";

const MrMillanQuips = [
    "Hold on to your horses, we're revving up the playlist engine!",
    "Just stretching our coding muscles before we start... almost there!",
    "We're untangling the headphone wires... patience, it's a workout!",
    "Loading... just like a slow jog uphill, but we promise the view at the top is worth it!",
    "Grab a water bottle and a snack, this loading screen is training for a marathon.",
    "Loading... because even software needs a warm-up before the real workout!",
    "Waiting for the beat drop... and the loading bar to finish.",
    "Gearing up... just like putting on your favorite workout gear before hitting the gym!",
    "Just doing some dynamic stretching... loading will be over soon!",
    "Buffering... just like catching your breath mid-run, we'll be back at full speed in no time!"
]

const LoadingScreen = () => {
    const [quipCounter, setQuipCounter] = useState<number>(0)

    useEffect(() => {
        const tid = setTimeout(() => {
            setQuipCounter(i => (i + 1) % MrMillanQuips.length);
        }, 3000);
        return () => {clearTimeout(tid)}
    }, [quipCounter, setQuipCounter])


    return (
        <Box display={"flex"} alignItems={"center"} justifyContent={"center"} width={"100vw"} height={"100vh"}>
            <Card style={{width: '50%', height: '80%', display: "flex", flexDirection:"column", justifyContent:"space-between", padding:"2%", borderRadius:"12px"}}>
                <Box display={"flex"} flexDirection={"column"} alignItems={"center"} justifyContent={"center"} width={"100%"} height={"100%"} gap={6}>
                    <Typography variant={"h5"}>
                        Loading Your Playlist
                    </Typography>
                    <CircularProgress size="3rem" color={"primary"}/>
                    <Typography variant={"h5"} color={" #6A6B6C"} align={"center"} width={"80%"}>
                        {MrMillanQuips.at(quipCounter)}
                    </Typography>
                </Box>
            </Card>
        </Box>
    )
}

export default LoadingScreen;