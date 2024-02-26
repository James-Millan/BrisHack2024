import React, {Dispatch, SetStateAction, useEffect} from "react";
import {redirect, useLocation, useNavigate} from "react-router-dom";
import SpotifyLogo from "../images/Spotify_Icon_RGB_Black.png";
import {Box, Button, Card, Divider, Typography} from "@mui/material";
import BGImage from "../images/BG.png"
import {motion} from "framer-motion";

const AuthPage = ({bearerToken, setBearerToken}: {
    bearerToken: string | null,
    setBearerToken: Dispatch<SetStateAction<string | null>>
}) => {

    const authRedirect = "https://accounts.spotify.com/authorize/?client_id=031f0f0508694b848103b317fe218c79&response_type=token&redirect_uri=http%3A%2F%2F127.0.0.1%3A3000%2Fcallback&scope=user-read-private+user-read-email%2C+user-library-read+playlist-modify-public+playlist-modify-private+user-modify-playback-state&state=OW5M366OWA2YW7XQ";

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
        <div className="App bg-gradient-to-t to-green-500 from-green-900 h-screen w-screen">
            <Box width={"100%"} display={"flex"} justifyContent={"center"} alignItems={"center"} flexDirection={"column"}>
            <motion.div
                    initial={{opacity: 0, x: -50}}
                    animate={{opacity: 1, x: 0}}
                    transition={{duration: 0.3, delay: 0.1}}
                    style={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        height: '100vh',
                        width: '100vw'
                    }}
                >
                    <Card style={{
                        width: '30%',
                        height: '40%',
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "space-between",
                        borderRadius: "12px",
                        paddingTop:"5%"
                    }}>
                        <motion.div
                            initial={{opacity: 0, y: -50}}
                            animate={{opacity: 1, y: 0}}
                            transition={{duration: 0.3, delay: 0.25}}>
                            <Typography variant="h3" color={"primary"} align="center">
                                Playlist Maker
                            </Typography>
                            <Typography variant="h6" color={"#ffffff"} align="center">
                                Custom Playlists to Power Your Run
                            </Typography>
                            <Box display={"flex"} justifyContent={"Center"} alignItems={"center"} width={"100%"}
                                 height={"100%"}>
                                <motion.div
                                    initial={{opacity: 0, y: -50}}
                                    animate={{opacity: 1, y: 0}}
                                    transition={{duration: 0.3, delay: 0.35}}>
                                    {bearerToken === null &&
                                        <Button
                                            variant="contained"
                                            onClick={() => window.location.href = (authRedirect)}
                                            startIcon={<img src={SpotifyLogo} alt="Spotify Logo"
                                                            style={{width: '1em', height: '1em'}}/>}
                                            size={"large"}
                                        >
                                            Login with Spotify
                                        </Button>}
                                </motion.div>
                            </Box>
                        </motion.div>
                    </Card>
                </motion.div>
            </Box>
        </div>
    );
}

export default AuthPage;
