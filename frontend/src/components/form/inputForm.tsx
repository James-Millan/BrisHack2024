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

const steps = ['Playlist Generator', 'Mode', 'Distance'];
const stepContents: React.ReactElement[] = [<AuthButton/>, <ToggleOptions/>, <DistanceSlider/>]

const MyForm = () => {
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
                <CardContent>
                    <Typography variant="h3" align="center">
                        {steps.at(activeStep)}
                    </Typography>

                </CardContent>
                <Box display={"flex"} justifyContent={"center"} alignItems={"center"} flexDirection={"column"} height={"100%"} width={"100%"} >
                    {stepContents.at(activeStep)}
                </Box>
                <CardActions>
                    <Box display="flex" flexDirection="column" width="100%" gap={3}>


                        <div>
                            {activeStep === steps.length ? (
                                <p>Form submitted successfully!</p>
                            ) : (
                                <Box display="flex" flexDirection="row" width="100%" justifyContent="space-evenly">
                                    <Button disabled={activeStep === 0} onClick={handleBack}>
                                        Back
                                    </Button>
                                    <Button variant="contained" color="primary" onClick={handleNext}>
                                        {activeStep === steps.length - 1 ? 'Submit' : 'Next'}
                                    </Button>
                                </Box>
                            )}
                        </div>

                        <Stepper activeStep={activeStep} alternativeLabel>
                            {steps.map((label) => (
                                <Step key={label}>
                                    <StepLabel></StepLabel>
                                </Step>
                            ))}
                        </Stepper>
                    </Box>
                </CardActions>
            </Card>
        </div>
    );
};

export default MyForm;
