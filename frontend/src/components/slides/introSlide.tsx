import * as React from 'react';
import Typography from '@mui/material/Typography';
import {Box, Grid} from '@mui/material';
import {useContext} from "react";
import {motion} from 'framer-motion'
import {useTheme} from "@emotion/react";

export default function IntroSlide() {
    const theme = useTheme();
    return (
        <div>
            <Box display={"flex"} justifyContent={"center"} alignItems={"center"} style={{zIndex: 1, position: "relative" }} width={"100%"} height={"100%"}>
                <motion.div
                    initial={{opacity: 0, scale: 0}}
                    animate={{opacity: 1, scale: 1}}
                    transition={{duration: 0.3, delay: 1.0}}
                >
                <Box width={"100%"} height={"100%"} style={{backgroundColor:"#232323", borderRadius:"12px"}} p={5}>
                    <motion.div
                        initial={{opacity: 0, x: -50}}
                        animate={{opacity: 1, x: 0}}
                        transition={{duration: 0.3, delay: 1.5}}
                    >
                        <Typography variant={"h2"} color={"primary"} textAlign={"center"} >
                            Playlist Generated
                        </Typography>
                    </motion.div>
                </Box>
                </motion.div>
            </Box>
            <div style={{
                position: "absolute",
                top: -100,
                left: 0,
                width: "100%",
                height: "100%"
            }}>
                <svg version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 210 297" width={"100%"} height={"120%"}>
                    <g>
                        <motion.path
                            fill="transparent"
                            strokeWidth="40"
                            stroke={"#1DB954"}
                            initial={{pathLength: 0}}
                            animate={{pathLength: 1}}
                            transition={{duration: 1}}
                            d="M 1.5119045,-0.83318009 C 114.17566,-0.09509947 210.59293,45.428635 100,148 -26.199807,265.04623 114.5774,296.75654 212.42261,296.45406"
                        />
                    </g>
                </svg>
            </div>
        </div>
    );
}