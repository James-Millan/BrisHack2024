// MyForm.js

import React, { useState } from 'react';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import {Box, Card, CardActions, CardContent, CardHeader, Stack, Typography} from "@mui/material";
import ToggleOptions from "./modeSelector";
import {ReactJSXElement} from "@emotion/react/types/jsx-namespace";
import AuthPage from "../../pages/AuthPage";
import AuthButton from "./authButton";
import DistanceSlider from "./distanceSlider";
import ModeSelector from "./modeSelector";

const steps = ['Sign In', 'Mode', 'Distance'];
const stepContents: React.ReactElement[] = [<AuthButton/>, <ToggleOptions/>, <DistanceSlider/>]

const MyForm = ({Token}: {Token : string | null}) => {
    const [activeStep, setActiveStep] = useState(0);

    const handleNext = () => {
        setActiveStep((prevStep) => prevStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevStep) => prevStep - 1);
    };

    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', width: '100vw' }}>
            <Card style={{width: '50%', height: '80%', display: "flex", flexDirection:"column", justifyContent:"space-between", padding:"2%"}}>
                <Typography variant="h3" align="center">
                    Welcome
                </Typography>
                <Box display={"flex"} flexDirection={"column"} alignItems={"center"} justifyContent={"space-evenly"} height={"100%"}>
                    <ModeSelector/>
                    <DistanceSlider/>
                </Box>
                <CardActions>
                    <Box display={"flex"} flexDirection={"row"} alignItems={"center"} justifyContent={"center"} width={"100%"}>
                        <Button variant="contained" color="primary">
                            Submit
                        </Button>
                    </Box>
                </CardActions>
            </Card>
        </div>
    );
};

export default MyForm;
