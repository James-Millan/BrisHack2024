import ReactDOM from 'react-dom/client';
import './index.css';
import AuthPage from './pages/AuthPage';
import {Routes, Route, BrowserRouter} from "react-router-dom";
import NotFound from "../src/pages/NotFound";
import { useState } from 'react';
import React from 'react';
import FormPage from "./pages/Form";
import { ThemeOptions } from '@mui/material/styles';
import {createTheme, Theme, ThemeProvider} from "@mui/material/styles";
import theme from "./theme";


const App = () => {

    const [bearerToken, setBearerToken] = useState<string | null>(null);

    return <React.StrictMode>
        <BrowserRouter>
            <ThemeProvider theme={theme}>
            <Routes>
                <Route index element={<AuthPage bearerToken={bearerToken} setBearerToken={setBearerToken} />} />
                <Route path="/callback" element={<AuthPage bearerToken={bearerToken} setBearerToken={setBearerToken} />} />
                <Route path="/start" element={<FormPage Token={bearerToken}/>} />
                {/*<Route path="dashboard" element={<Dashboard />} />*/}
                <Route path="*" element={<NotFound />} />
            </Routes>
            </ThemeProvider>
        </BrowserRouter>
    </React.StrictMode>
}

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);
root.render(
    <App />
);