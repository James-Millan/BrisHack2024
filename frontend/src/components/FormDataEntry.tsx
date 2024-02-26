import React, {Dispatch, SetStateAction, useState} from "react";
import {Box, Card, CardActions, Typography} from "@mui/material";
import ModeSelector from "./form/modeSelector";
import DistanceSlider from "./form/distanceSlider";
import Button from "@mui/material/Button";


const FormDataEntry = ({Token, setCurrentState, setFormData} : {Token : string | null, setCurrentState : Dispatch<SetStateAction<string>>, setFormData : Dispatch<SetStateAction<object | null>>}) => {

    const [runType, setRunType] = useState<string | null>("running");
    const [distance, setDistance] = useState<number | number[]>(5.0);


    function submitForm(): void {
        // collect form data
        let formData = {
            "runType": runType,
            "distance": distance
        }

        setCurrentState("loading")
        setFormData(formData)
    }

    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', width: '100vw' }}>
            <Card style={{width: '50%', height: '80%', display: "flex", flexDirection:"column", justifyContent:"space-between", padding:"2%"}}>
                <Typography variant="h3" align="center">
                    Select Your Options
                </Typography>
                <Box display={"flex"} flexDirection={"column"} alignItems={"center"} justifyContent={"space-evenly"} height={"100%"}>
                    <ModeSelector runType={runType} setRunType={setRunType}/>
                    <DistanceSlider setDistance={setDistance}/>
                </Box>
                <CardActions>
                    <Box display={"flex"} flexDirection={"row"} alignItems={"center"} justifyContent={"center"} width={"100%"}>
                        <Button variant="contained" color="primary" onClick={submitForm}>
                            Submit
                        </Button>
                    </Box>
                </CardActions>
            </Card>
        </div>
    );
};

export default FormDataEntry;