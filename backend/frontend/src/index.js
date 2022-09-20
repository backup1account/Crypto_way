import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Route, Routes } from "react-router-dom";

import './index.css';

import App from './App';
import Settings from './routes/Settings';
import Authorization from './Authentication/Auth';
import PageNotFound from './routes/NotFound';

import PrivateRoute from './Authentication/PrivateRoute';

import reportWebVitals from './reportWebVitals';


const root = ReactDOM.createRoot(
  document.getElementById("root")
);


root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route element={ <PrivateRoute /> }>
          <Route path="/" element={ <App /> } />
          <Route path="/settings" element={<Settings />} />
        </Route>

        <Route path="/auth" element={<Authorization />} />
        <Route path="/*" element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
