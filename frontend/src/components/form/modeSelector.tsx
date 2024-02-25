import React, { useState } from 'react';
import { Box, Button, Card, CardContent, CardActions, Typography, CardActionArea, Grid } from '@mui/material';
import DirectionsRunIcon from '@mui/icons-material/DirectionsRun';
import DirectionsWalkIcon from '@mui/icons-material/DirectionsWalk';
import DirectionsRunOutlinedIcon from '@mui/icons-material/DirectionsRunOutlined';
import DirectionsWalkOutlinedIcon from '@mui/icons-material/DirectionsWalkOutlined';

const ToggleOptions = () => {
    const [selectedOption, setSelectedOption] = useState('running');

    const handleOptionChange = (option: string) => {
        setSelectedOption(option);
    };

    return (
                    <Box display="flex" justifyContent="center" alignItems="center"  height={"100%"} width={"100%"} gap={4}>
                        <Button
                            variant={selectedOption === 'running' ? 'contained' : 'outlined'}
                            color="primary"
                            onClick={() => handleOptionChange('running')}
                            style={{height: '30%'}}
                        >
                            <Box display={"flex"} flexDirection={"column"} alignItems={"center"}>
                                {selectedOption === 'running' ? <DirectionsRunIcon /> : <DirectionsRunOutlinedIcon />}
                                <Typography>Running</Typography>
                            </Box>
                        </Button>
                        <Button
                            variant={selectedOption === 'jogging' ? 'contained' : 'outlined'}
                            color="primary"
                            onClick={() => handleOptionChange('jogging')}
                            style={{height: '30%'}}
                        >
                            <Box display={"flex"} flexDirection={"column"} alignItems={"center"}>
                                {selectedOption === 'jogging' ? <DirectionsRunIcon /> : <DirectionsRunOutlinedIcon />}
                                <Typography>Jogging</Typography>
                            </Box>
                        </Button>
                        <Button
                            variant={selectedOption === 'walking' ? 'contained' : 'outlined'}
                            color="primary"
                            onClick={() => handleOptionChange('walking')}
                            style={{height: '30%'}}
                        >
                            <Box display={"flex"} flexDirection={"column"} alignItems={"center"}>
                                {selectedOption === 'walking' ? <DirectionsWalkIcon /> : <DirectionsWalkOutlinedIcon />}
                                <Typography>Walking</Typography>
                            </Box>
                        </Button>
                    </Box>
    );
};

export default ToggleOptions;
