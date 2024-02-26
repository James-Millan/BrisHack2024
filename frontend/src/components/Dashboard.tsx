import {Box, Card, CircularProgress, Typography} from "@mui/material";
import React, {useEffect, useState} from "react";
import Map from "./Map";
import {motion} from "framer-motion";

function toHHMMSS(num: number) {
    let seconds = Math.floor(num);
    let hours = Math.floor(seconds / 3600);
    seconds -= hours * 3600;
    const minutes = Math.floor(seconds / 60);
    seconds -= minutes * 60;

    return `${hours}h ${minutes}m ${seconds}s`;
};

const Dashboard = ({APIData}: { APIData: any }) => {


    return (
        <Box display={"flex"} alignItems={"center"} justifyContent={"space-evenly"} width={"100vw"} height={"100vh"}>
            <motion.div
                initial={{opacity: 0, y: -50}}
                animate={{opacity: 1, y: 0}}
                transition={{duration: 0.3, delay: 0}}
                style={{
                    width: "50%",
                    height: "90%"
                }}
            >
                <Card style={{
                    backgroundColor: "#131313",
                    width: '100%',
                    height: '100%',
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    padding: "2%",
                    borderRadius: "12px"
                }}>
                    <Map APIData={APIData}/>
                </Card>
            </motion.div>
            <Box width={"20%"} gap={5} height={"90%"} display={"flex"} flexDirection={"column"}
                 justifyContent={"center"} alignItems={"center"}>
                <Box width={"100%"} gap={4} height={"100%"} style={{backgroundColor: "#232323", borderRadius: "12px"}}
                     p={5} display={"flex"} justifyContent={"top"} alignItems={"center"} flexDirection={"column"}>
                    <motion.div
                        initial={{opacity: 0, y: -50}}
                        animate={{opacity: 1, y: 0}}
                        transition={{duration: 0.3, delay: 0}}
                    >
                        <Typography variant={"h5"} color={"#ffffff"} textAlign={"center"}>
                            Distance
                        </Typography>
                    </motion.div>
                    <motion.div
                        initial={{opacity: 0, y: -50}}
                        animate={{opacity: 1, y: 0}}
                        transition={{duration: 0.3, delay: 0.1}}
                    >
                        <Typography variant={"h3"} color={"primary"} textAlign={"center"}>
                            {`${APIData[`distance`] / 1000} km`}
                        </Typography>
                    </motion.div>
                </Box>
                <Box width={"100%"} gap={4} height={"100%"} style={{backgroundColor: "#232323", borderRadius: "12px"}}
                     p={5} display={"flex"} justifyContent={"top"} alignItems={"center"} flexDirection={"column"}>
                    <motion.div
                        initial={{opacity: 0, y: -50}}
                        animate={{opacity: 1, y: 0}}
                        transition={{duration: 0.3, delay: 0.15}}
                    >
                        <Typography variant={"h5"} color={"#ffffff"} textAlign={"center"}>
                            Duration
                        </Typography>
                    </motion.div>
                    <motion.div
                        initial={{opacity: 0, y: -50}}
                        animate={{opacity: 1, y: 0}}
                        transition={{duration: 0.3, delay: 0.25}}
                    >
                        <Typography variant={"h3"} color={"primary"} textAlign={"center"}>
                            {` ${toHHMMSS(APIData[`duration`])} `}
                        </Typography>
                    </motion.div>
                </Box><Box width={"100%"} gap={4} height={"100%"}
                           style={{backgroundColor: "#232323", borderRadius: "12px"}} p={5} display={"flex"}
                           justifyContent={"top"} alignItems={"center"} flexDirection={"column"}>
                <motion.div
                    initial={{opacity: 0, y: -50}}
                    animate={{opacity: 1, y: 0}}
                    transition={{duration: 0.3, delay: 0.3}}
                >
                    <Typography variant={"h5"} color={"#ffffff"} textAlign={"center"}>
                        Vibes
                    </Typography>
                </motion.div>
                <motion.div
                    initial={{opacity: 0, y: -50}}
                    animate={{opacity: 1, y: 0}}
                    transition={{duration: 0.3, delay: 0.35}}
                >
                    <Typography variant={"h3"} color={"primary"} textAlign={"center"}>
                        ?
                    </Typography>
                </motion.div>
            </Box>
            </Box>
            <motion.div
                initial={{opacity: 0, y: -50}}
                animate={{opacity: 1, y: 0}}
                transition={{duration: 0.3, delay: 0.3}}
                style={{
                    width: "25%",
                    height: "90%"
                }}
            >
                <iframe
                    style={{borderRadius: "12px"}}
                    src={`https://open.spotify.com/embed/playlist/${APIData["playlistId"]}?utm_source=generator&theme=0`}
                    width="100%"
                    height="100%"
                    allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                    loading="lazy">
                </iframe>
            </motion.div>
        </Box>
    )
}

export default Dashboard;