import * as React from 'react';
import Typography from '@mui/material/Typography';
import {Box, Grid} from '@mui/material';
import {useContext} from "react";
import {motion} from 'framer-motion'
import {useTheme} from "@emotion/react";

const DistanceSlide = ({APIData}: { APIData: any }) => {
    const theme = useTheme();
    return (
        <div>
            <Box display={"flex"} justifyContent={"center"} alignItems={"center"}
                 style={{zIndex: 1, position: "relative"}} width={"100%"} height={"100%"}>
                <motion.div
                    initial={{opacity: 0, scale: 0}}
                    animate={{opacity: 1, scale: 1}}
                    transition={{duration: 0.3, delay: 1.0}}
                >
                    <Box width={"100%"} height={"100%"} style={{backgroundColor: "#232323", borderRadius: "12px"}}
                         p={5}>
                        <motion.div
                            initial={{opacity: 0, x: -50}}
                            animate={{opacity: 1, x: 0}}
                            transition={{duration: 0.3, delay: 1.5}}
                            style={{
                                width: '100%',
                                height: '100%',
                                display: "flex",
                                flexDirection: "column",
                                justifyContent: "space-between",
                                alignItems: "center",
                                padding: "2%",
                                borderRadius: "12px"
                            }}
                        >
                            <Typography variant={"h5"} color={"primary"} textAlign={"center"}>
                                You're going to run
                            </Typography>
                            <Typography variant={"h2"} color={"#ffffff"} textAlign={"center"} width={"100%"}>
                                {`${APIData[`distance`] / 1000} km`}
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
                <svg version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 400" width={"200%"}
                     height={"220%"}>
                    <g>
                        <motion.path
                            fill="transparent"
                            strokeWidth="40"
                            stroke={"#1DB954"}
                            initial={{pathLength: 0}}
                            animate={{pathLength: 1}}
                            transition={{duration: 1, delay: 0.3}}
                            d="M183.5575408935547,389.2376708984375C220.92674509684244,365.6203308105469,348.28099314371747,298.3557535807292,407.77276611328125,247.53363037109375C467.26453908284503,196.71150716145834,541.405039469401,122.86995379130045,540.5081787109375,84.304931640625C539.611317952474,45.73990948994955,453.2137196858724,7.3243649800618496,402.3916015625,16.143497467041016C351.5694834391276,24.96262995402018,192.07770792643228,76.23318036397299,235.57546997070312,137.2197265625C279.07323201497394,198.206272761027,592.0777231852213,341.25559997558594,663.378173828125,382.0627746582031"/>
                    </g>
                </svg>
            </div>
            <div style={{
                position: "absolute",
                top: -100,
                left: 0,
                width: "100%",
                height: "100%"
            }}>
                <svg version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 210 297" width={"100%"}
                     height={"120%"}>
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

export default DistanceSlide;