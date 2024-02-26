import React, {Dispatch, SetStateAction, useState} from "react";
import {Box, Card, CardActions, Typography} from "@mui/material";
import ModeSelector from "./form/modeSelector";
import DistanceSlider from "./form/distanceSlider";
import Button from "@mui/material/Button";
import {motion} from "framer-motion";


const FormDataEntry = ({Token, setCurrentState, setFormData}: {
    Token: string | null,
    setCurrentState: Dispatch<SetStateAction<string>>,
    setFormData: Dispatch<SetStateAction<object | null>>
}) => {

    const [runType, setRunType] = useState<string | null>("running");
    const [distance, setDistance] = useState<number | number[]>(5.0);


    function submitForm(): void {
        // collect form data
        let formData = {
            "runType": runType,
            // @ts-ignore
            "distance": distance * 1000,
            "apiKey": Token,
            "lat": 51.4560,
            "lng": -2.6046

        }

        setCurrentState("loading")
        setFormData(formData)
    }

    return (
        <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', width: '100vw'}}>
            <Card style={{
                width: '50%',
                height: '80%',
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                padding: "2%",
                borderRadius: "12px"
            }}>
                <motion.div
                    initial={{opacity: 0, y: -50}}
                    animate={{opacity: 1, y: 0}}
                    transition={{duration: 0.3, delay: 0}}
                >
                    <Typography variant="h3" align="center">
                        Select Your Options
                    </Typography>
                </motion.div>
                <Box display={"flex"} flexDirection={"column"} alignItems={"center"} justifyContent={"space-evenly"}
                     height={"100%"}>
                    <ModeSelector runType={runType} setRunType={setRunType}/>
                    <DistanceSlider setDistance={setDistance}/>
                </Box>
                <CardActions>
                    <motion.div
                        initial={{opacity: 0, y: 0}}
                        animate={{opacity: 1, y: 0}}
                        transition={{duration: 0.3, delay: 0.25}}
                        style={{
                            width:"100%"
                        }}
                    >
                        <Box display={"flex"} flexDirection={"row"} alignItems={"center"} justifyContent={"center"}
                             width={"100%"}>
                            <Button variant="contained" color="primary" onClick={submitForm}>
                                Submit
                            </Button>
                        </Box>
                    </motion.div>
                </CardActions>
            </Card>
        </div>
    );
};

export default FormDataEntry;