import { useState } from "react";
import {Box, Button} from "@mui/material";
import SpotifyLogo from "../../images/Spotify_Icon_RGB_Green.png"

function AuthButton() {

    const [bearerToken, setBearerToken] = useState<string | null>(null);

    return (
        <Box className="">
            {bearerToken}
            {bearerToken === null &&
                <Button
                    variant="contained"
                    onClick={() => setBearerToken("Hi")}
                    startIcon={<img src={SpotifyLogo} alt="Spotify Logo" style={{ width: '1em', height: '1em' }}/>}
                    size={"large"}
                >
                    Login with Spotify
                </Button>
            }
        </Box>
    );
}



export default AuthButton;
