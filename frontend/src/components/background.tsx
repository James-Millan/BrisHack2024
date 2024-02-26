import BG from "../images/BG.png"
import {Box} from "@mui/material";

const BGTile = () => {
    const containerStyle = {
        width: '100%',
        height: '100vh', // Adjust as needed
        backgroundColor: '#575757', // New background color
        backgroundImage: 'url("C:\\Users\\georg\\Desktop\\brihack\\BrisHack2024\\frontend\\src\\images\\BG.png")', // URL to your image
        backgroundSize: 'cover', // Adjust to fit or cover as needed
        backgroundPosition: 'center', // Adjust position (e.g., 'top', 'bottom', '50% 50%')
    };

    return(
        <Box width={"100%"} height={"100vh"}>
            <img src={BG} style={{backgroundSize: 'cover', width: '10%', height: '10%', backgroundRepeat: "repeat"}}></img>;
        </Box>
    )
};

export default BGTile;