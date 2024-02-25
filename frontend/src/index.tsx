import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import AuthPage from './pages/AuthPage';
import {Routes, Route, BrowserRouter} from "react-router-dom"
import NotFound from "../src/pages/NotFound"

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
      <BrowserRouter>
          <Routes>
              <Route index element={<AuthPage />} />
              {/*<Route path="about" element={<About />} />*/}
              {/*<Route path="dashboard" element={<Dashboard />} />*/}
              <Route path="*" element={<NotFound />} />
          </Routes>
      </BrowserRouter>
  </React.StrictMode>
);
