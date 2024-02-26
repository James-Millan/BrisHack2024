// MyForm.js

import React, {Dispatch, SetStateAction, useEffect, useState} from 'react';
import FormDataEntry from "../FormDataEntry";
import LoadingScreen from "../loading";
import Dashboard from "../Dashboard";

const apiURL = "http://ec2-18-171-186-164.eu-west-2.compute.amazonaws.com/api/route"
const playlistID = "76HBifC4wKqi4bwYXb0S1P"



const MyForm = ({Token}: {Token : string | null}) => {
    const [currentState, setCurrentState] = useState<string>("done");
    const [formData, setFormData] = useState<object | null>(null)
    const [apiResponse, setAPIResponse] = useState<object | null>(null)


    useEffect(() => {
        console.log("sending API req")
        // do API stuff
        fetch(apiURL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        })
            .then((response) => response.json())
            .then((data) => {
                console.log('API response:', data);
                // Handle the response data as needed
            })
            .catch((error) => {
                console.error('Error sending JSON data:', error);
                // Handle the error
            });

        // setCurrentState("done")
    }, [formData, setFormData])

    function renderSwitch(){
        switch (currentState){
            case "in":
                return <FormDataEntry Token={Token} setCurrentState={setCurrentState} setFormData={setFormData}/>
            case "loading":
                return <LoadingScreen/>
            case "done":
                return <Dashboard PlaylistId={playlistID}/>

        }
    }

    return (
        <div>
            {renderSwitch()}
        </div>
    );
};

export default MyForm;
