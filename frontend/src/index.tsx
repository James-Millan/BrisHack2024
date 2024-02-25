import ReactDOM from 'react-dom/client';
import './index.css';
import AuthPage from './pages/AuthPage';
import {Routes, Route, BrowserRouter} from "react-router-dom";
import NotFound from "../src/pages/NotFound";
import { useState } from 'react';
import React from 'react';
import FormPage from "./pages/Form";

const App = () => {

    const [bearerToken, setBearerToken] = useState<string | null>(null);

    return <React.StrictMode>
        <BrowserRouter>
            <Routes>
                <Route index element={<AuthPage bearerToken={bearerToken} setBearerToken={setBearerToken} />} />
                <Route path="/callback" element={<AuthPage bearerToken={bearerToken} setBearerToken={setBearerToken} />} />
                <Route path="/start" element={<FormPage Token={bearerToken}/>} />
                {/*<Route path="dashboard" element={<Dashboard />} />*/}
                <Route path="*" element={<NotFound />} />
            </Routes>
        </BrowserRouter>
    </React.StrictMode>
}

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);
root.render(
    <App />
);