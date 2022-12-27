import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Route, Routes } from "react-router-dom";

import { AuthProvider } from "./Authentication/Auth";

import './index.css';

import App from './App';
import SettingsPage from './UserSettings/Settings';
import ForumPage from './routes/Forum';
import Authorization from './Authentication/AuthPage';
import PageNotFound from './routes/NotFound';
import { PrivateRoute, RedirectHome } from './Authentication/PrivateRoute';

import reportWebVitals from './reportWebVitals';


const root = ReactDOM.createRoot(
  document.getElementById("root")
);


root.render(
    <BrowserRouter>
     <AuthProvider>
      <Routes>
        <Route element={ <PrivateRoute /> }>
          <Route path="/" element={ <App /> } />
          <Route path="/settings" element={<SettingsPage />} />
          <Route path="/forum" element={<ForumPage />} />
        </Route>

        <Route element={ <RedirectHome /> }>
          <Route path="/auth" element={<Authorization />} />
        </Route>
        <Route path="/*" element={<PageNotFound />} />
      </Routes>
     </AuthProvider>
    </BrowserRouter>
);


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
