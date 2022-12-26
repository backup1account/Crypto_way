import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import AuthContext from "./Authentication/Auth";
import LandingPage from "./routes/Landing";

import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});


export default function App() {
  let { logoutUser, userInformation } = useContext(AuthContext);
  let [user] = userInformation;

  return (
    <ThemeProvider theme={darkTheme}>
    <CssBaseline />

      <div className="App-links">
        <Link to="/settings">Ustawienia</Link>
        <Link to="/forum">Forum</Link>
        <Link to="/auth" onClick={logoutUser}>Wyloguj sie</Link>
      </div>

      {/* navbar */}
      <div>
        <h4>User profile yay</h4>
        <p>{user.username}, {user.email}</p>
        <p>{user.first_name}</p>
        <img src={user.image}></img>
      </div>

      <LandingPage />

    </ThemeProvider>
  );
}
