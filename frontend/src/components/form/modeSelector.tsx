import React, {Dispatch, SetStateAction, useState} from 'react';
import { Box, Button, Card, CardContent, CardActions, Typography, CardActionArea, Grid } from '@mui/material';
import DirectionsRunIcon from '@mui/icons-material/DirectionsRun';
import DirectionsWalkIcon from '@mui/icons-material/DirectionsWalk';
import DirectionsRunOutlinedIcon from '@mui/icons-material/DirectionsRunOutlined';
import DirectionsWalkOutlinedIcon from '@mui/icons-material/DirectionsWalkOutlined';

const ModeSelector = ({runType, setRunType}: {runType : string | null, setRunType : Dispatch<SetStateAction<string | null>>}) => {
    const handleOptionChange = (option: string) => {
        setRunType(option);
    };

    return (
        <Box width={"100%"} display={"flex"} justifyContent={"center"} alignItems={"center"} flexDirection={"column"}>

            <Typography variant={"h5"} gutterBottom>
                Pick a Mode
            </Typography>
                    <Box display="flex" justifyContent="space-between" alignItems="center" width={"100%"} gap={4} pl={4} pr={4}>
                        <Button
                            variant={runType === 'running' ? 'contained' : 'outlined'}
                            color="primary"
                            onClick={() => handleOptionChange('running')}
                            style={{height: '100%'}}
                            fullWidth

                        >
                            <Box display={"flex"} flexDirection={"column"} alignItems={"center"}>
                                {runType === 'running' ? <DirectionsRunIcon /> : <DirectionsRunOutlinedIcon />}
                                <Typography>Running</Typography>
                            </Box>
                        </Button>
                        <Button
                            variant={runType === 'jogging' ? 'contained' : 'outlined'}
                            color="primary"
                            onClick={() => handleOptionChange('jogging')}
                            style={{height: '100%'}}
                            fullWidth
                        >
                            <Box display={"flex"} flexDirection={"column"} alignItems={"center"}>
                                {runType === 'jogging' ? <DirectionsRunIcon /> : <DirectionsRunOutlinedIcon />}
                                <Typography>Jogging</Typography>
                            </Box>
                        </Button>
                        <Button
                            variant={runType === 'walking' ? 'contained' : 'outlined'}
                            color="primary"
                            onClick={() => handleOptionChange('walking')}
                            style={{height: '100%'}}
                            fullWidth

                        >
                            <Box display={"flex"} flexDirection={"column"} alignItems={"center"}>
                                {runType === 'walking' ? <DirectionsWalkIcon /> : <DirectionsWalkOutlinedIcon />}
                                <Typography>Walking</Typography>
                            </Box>
                        </Button>
                    </Box>
        </Box>
    );
};

export default ModeSelector;
