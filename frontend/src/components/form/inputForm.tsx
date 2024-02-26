// MyForm.js

import React, {Dispatch, SetStateAction, useEffect, useState} from 'react';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import {Box, Card, CardActions, CardContent, CardHeader, CircularProgress, Stack, Typography} from "@mui/material";
import {ReactJSXElement} from "@emotion/react/types/jsx-namespace";
import AuthPage from "../../pages/AuthPage";
import AuthButton from "./authButton";
import DistanceSlider from "./distanceSlider";
import ModeSelector from "./modeSelector";
import FormDataEntry from "../FormDataEntry";
import LoadingScreen from "../loading";

const MyForm = ({Token}: {Token : string | null}) => {
    const [currentState, setCurrentState] = useState<string>("in");
    const [formData, setFormData] = useState<object | null>(null)

    function renderSwitch(){
        switch (currentState){
            case "in":
                return <FormDataEntry Token={Token} setCurrentState={setCurrentState} setFormData={setFormData}/>
            case "loading":
                return <LoadingScreen/>
            case "done":
                return <h1>Dashboard!</h1>

        }
    }

    return (
        <div>
            {renderSwitch()}
        </div>
    );
};

export default MyForm;
