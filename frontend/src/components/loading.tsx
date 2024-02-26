import {Box, Card, CircularProgress, Typography} from "@mui/material";
import React, {useEffect, useState} from "react";

const MrMillanQuips = ["being funny", "you want some whitebaord with that erasor fluid"]

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
            <Card style={{width: '50%', height: '80%', display: "flex", flexDirection:"column", justifyContent:"space-between", padding:"2%"}}>
                <Box display={"flex"} flexDirection={"column"} alignItems={"center"} justifyContent={"center"} width={"100%"} height={"100%"} gap={4}>
                    <Typography variant={"h5"}>
                        Loading Your Playlist
                    </Typography>
                    <CircularProgress size="3rem" color={"primary"}/>
                    <Typography variant={"h5"} color={" #6A6B6C"}>
                        {MrMillanQuips.at(quipCounter)}
                    </Typography>
                </Box>
            </Card>
        </Box>
    )
}

export default LoadingScreen;