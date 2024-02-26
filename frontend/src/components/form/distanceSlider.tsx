import {Dispatch, SetStateAction, useState} from "react";
import {Box, Button, Slider, Typography} from "@mui/material";
import {motion} from "framer-motion";

const DistanceSlider = ({setDistance}: { setDistance: Dispatch<SetStateAction<number | number[]>> }) => {

    const marks = [
        {
            value: 0,
            label: '0km',
        },
        {
            value: 5,
            label: '5km',
        },
        {
            value: 10,
            label: '10km',
        },
        {
            value: 15,
            label: '15km',
        },
        {
            value: 20,
            label: '20km',
        },
        {
            value: 25,
            label: '25km',
        },
        {
            value: 30,
            label: '30km',
        },
        {
            value: 35,
            label: '35km',
        },
        {
            value: 40,
            label: '40km',
        },
        {
            value: 45,
            label: '45km',
        },
        {
            value: 50,
            label: '50km',
        },
    ];

    function valueLabelFormat(value: number) {
        return `${value} km`;
    }

    return (
        <Box width={"100%"} display={"flex"} justifyContent={"center"} alignItems={"center"}
             flexDirection={"column"}>
            <motion.div
                initial={{opacity: 0, y: -50}}
                animate={{opacity: 1, y: 0}}
                transition={{duration: 0.3, delay: 0.1}}
            >
                <Typography variant={"h5"} gutterBottom>
                    Distance
                </Typography>
            </motion.div>

            <motion.div
                initial={{opacity: 0, y: -50}}
                animate={{opacity: 1, y: 0}}
                transition={{duration: 0.3, delay: 0.25}}
                style={{
                    width: "100%",
                    display:"flex",
                    justifyContent:"center",
                    alignItems:"center"
                }}
            >
                <Slider
                    defaultValue={5}
                    valueLabelDisplay="auto"
                    shiftStep={0.5}
                    step={0.5}
                    getAriaValueText={valueLabelFormat}
                    valueLabelFormat={valueLabelFormat}
                    marks={marks}
                    min={0}
                    max={50}
                    style={{width: '85%'}}
                    onChange={(e, val) => {
                        setDistance(val)
                    }}
                />
            </motion.div>
        </Box>
    );
}

export default DistanceSlider;

