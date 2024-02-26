import React, { Dispatch, SetStateAction, useEffect } from "react";
import {redirect, useLocation, useNavigate} from "react-router-dom";
import SpotifyLogo from "../images/Spotify_Icon_RGB_Black.png";
import {Box, Button, Card, Typography} from "@mui/material";
import BGImage from "../images/BG.png"

const AuthPage = ({bearerToken, setBearerToken}: {bearerToken : string | null, setBearerToken : Dispatch<SetStateAction<string | null>>}) => {

  const authRedirect = "https://accounts.spotify.com/authorize/?client_id=031f0f0508694b848103b317fe218c79&response_type=token&redirect_uri=http%3A%2F%2F127.0.0.1%3A3000%2Fcallback&scope=user-read-private+user-read-email%2C+user-library-read+playlist-modify-public+playlist-modify-private&state=OW5M366OWA2YW7XQ";

  const location_hash = useLocation().hash;

  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(location_hash);
    const access_token = params.get("#access_token");
    if (access_token) {
      setBearerToken(access_token);
      navigate("/start")
    }
  }, [setBearerToken, location_hash]);

  return (
    <div className="App bg-gradient-to-t to-green-500 from-green-900 h-screen w-screen" >
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', width: '100vw' }}>
        <Card style={{width: '30%', height: '30%', display: "flex", flexDirection:"column", justifyContent:"space-between", padding:"2%"}}>
          <Typography variant="h3" align="center">
            Playlist Runner
          </Typography>
          <Box display={"flex"} justifyContent={"Center"} alignItems={"center"} width={"100%"} height={"100%"}>
          {bearerToken === null &&
            <Button
              variant="contained"
              onClick={() => window.location.href = (authRedirect)}
              startIcon={<img src={SpotifyLogo} alt="Spotify Logo" style={{ width: '1em', height: '1em' }}/>}
              size={"large"}
            >
              Login with Spotify
            </Button>}
          </Box>
          </Card>
          </div>
    </div>
  );
}

export default AuthPage;
