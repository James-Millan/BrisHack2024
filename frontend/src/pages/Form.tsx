import {Dispatch, SetStateAction, useState} from "react";
import InputForm from "../components/form/inputForm";
import MyForm from "../components/form/inputForm";
import {Box} from "@mui/material";


const FormPage = ({Token}: {Token : string | null}) => {

    const [bearerToken, setBearerToken] = useState<string | null>(null);

    return (
        <div className="App bg-gradient-to-t to-green-500 from-green-900 h-screen w-screen">
            <Box height={"80vh"}>
                <MyForm Token={Token}/>
            </Box>
        </div>
    );
}

export default FormPage;
