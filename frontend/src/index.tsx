import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import {Routes, Route, BrowserRouter} from "react-router-dom"
import NotFound from "../src/pages/NotFound"
import FormPage from "./pages/Form";

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
      <BrowserRouter>
          <Routes>
              {/*<Route index element={<AuthPage />} />*/}
              {/*<Route path="about" element={<About />} />*/}
              <Route path="/start" element={<FormPage />} />
              <Route path="*" element={<NotFound />} />
          </Routes>
      </BrowserRouter>
  </React.StrictMode>
);
