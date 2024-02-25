import { useState } from "react";
import {Box, Button, Slider} from "@mui/material";

function DistanceSlider() {

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


    return (
        <Box width={"100%"} display={"flex"} justifyContent={"center"}>
            <Slider
                defaultValue={5}
                valueLabelDisplay="auto"
                shiftStep={0.5}
                step={0.5}
                marks={marks}
                min={0}
                max={50}
                style={{width: '80%'}}
            />
        </Box>
    );
}

export default DistanceSlider;

