import {Box, Card, CircularProgress, Typography} from "@mui/material";
import React, {useEffect, useState} from "react";
import Map from "./Map";
import {motion} from "framer-motion";
import {
    FacebookIcon,
    FacebookShareButton,
    RedditIcon,
    RedditShareButton,
    TwitterIcon,
    TwitterShareButton
} from "react-share";

function toHHMMSS(num: number) {
    let seconds = Math.floor(num);
    let hours = Math.floor(seconds / 3600);
    seconds -= hours * 3600;
    const minutes = Math.floor(seconds / 60);
    seconds -= minutes * 60;

    return `${hours}h ${minutes}m ${seconds}s`;
};

const Dashboard = ({APIData, Token}: { APIData: any, Token : string | null }) => {


    return (
        <div>
            <Box display={"flex"} alignItems={"center"} justifyContent={"space-evenly"} width={"100vw"}
                 height={"100vh"}>
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
                        <Map Token={Token} APIData={APIData}/>
                    </Card>
                </motion.div>
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

                <Box width={"20%"} gap={5} height={"90%"} display={"flex"} flexDirection={"column"}
                     justifyContent={"center"} alignItems={"center"}>
                    <Box width={"100%"} gap={4} height={"100%"}
                         style={{backgroundColor: "#232323", borderRadius: "12px"}}
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
                    <Box width={"100%"} gap={4} height={"100%"}
                         style={{backgroundColor: "#232323", borderRadius: "12px"}}
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
                    </Box>
                    <Box width={"100%"} gap={4} height={"100%"}
                         style={{backgroundColor: "#232323", borderRadius: "12px"}} p={5} display={"flex"}
                         justifyContent={"top"} alignItems={"center"} flexDirection={"column"}>
                        <motion.div
                            initial={{opacity: 0, y: -50}}
                            animate={{opacity: 1, y: 0}}
                            transition={{duration: 0.3, delay: 0.3}}
                        >
                            <Typography variant={"h5"} color={"#ffffff"} textAlign={"center"}>
                                Share
                            </Typography>
                        </motion.div>
                        <motion.div
                            initial={{opacity: 0, y: -50}}
                            animate={{opacity: 1, y: 0}}
                            transition={{duration: 0.3, delay: 0.35}}
                        >
                            <Box width={"100%"}  height={"100%"}
                                 style={{backgroundColor: "#232323", borderRadius: "12px"}}
                                 display={"flex"} alignItems={"center"} justifyContent={"start"} gap={3} pl={4} pr={4}
                            >
                                <FacebookShareButton
                                    url={`https://open.spotify.com/${APIData["playlistId"]}`}
                                    hashtag="#Health"
                                >
                                    <FacebookIcon size={50} round />
                                </FacebookShareButton>
                                <TwitterShareButton
                                    url={`https://open.spotify.com/${APIData["playlistId"]}`}
                                    title={"My new running playlist"}
                                >
                                    <TwitterIcon size={50} round />
                                </TwitterShareButton>
                                <RedditShareButton
                                    url={`https://open.spotify.com/${APIData["playlistId"]}`}
                                    title={"My new running playlist"}
                                >
                                    <RedditIcon size={50} round />
                                </RedditShareButton>
                            </Box>
                        </motion.div>
                    </Box>
                </Box>
            </Box>
            {/*<Box position={"absolute"}*/}
            {/*     left={5}*/}
            {/*     bottom={0}*/}
            {/*     display={"flex"}*/}
            {/*     pl={2} pr={2} pb={2}*/}
            {/*     alignItems={"center"}*/}
            {/*     justifyContent={"space-evenly"}*/}
            {/*     width={"14vw"} height={"9vh"}>*/}
            {/*    <Box width={"100%"}  height={"100%"}*/}
            {/*         style={{backgroundColor: "#232323", borderRadius: "12px"}}*/}
            {/*         display={"flex"} alignItems={"center"} justifyContent={"start"} gap={3} pl={4} pr={4}*/}
            {/*    >*/}
            {/*        <FacebookShareButton*/}
            {/*            url={'https://www.example.com'}*/}
            {/*            // @ts-ignore*/}
            {/*            quote={'Dummy text!'}*/}
            {/*            hashtag="#Health"*/}
            {/*        >*/}
            {/*            <FacebookIcon size={32} round />*/}
            {/*        </FacebookShareButton>*/}
            {/*        <TwitterShareButton*/}
            {/*            url={'https://www.example.com'}*/}
            {/*            // @ts-ignore*/}
            {/*            quote={'Dummy text!'}*/}
            {/*            hashtag="#Health"*/}
            {/*        >*/}
            {/*            <TwitterIcon size={32} round />*/}
            {/*        </TwitterShareButton>*/}
            {/*        <RedditShareButton*/}
            {/*            url={'https://www.example.com'}*/}
            {/*            // @ts-ignore*/}
            {/*            quote={'Dummy text!'}*/}
            {/*            hashtag="#Health"*/}
            {/*        >*/}
            {/*            <RedditIcon size={32} round />*/}
            {/*        </RedditShareButton>*/}
            {/*    </Box>*/}
            {/*</Box>*/}
        </div>
    )
}

export default Dashboard;