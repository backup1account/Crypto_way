import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import AuthContext from "./Authentication/Auth";
import LandingPage from "./routes/Landing";


export default function App() {
  let { logoutUser, userInformation } = useContext(AuthContext);
  let [user] = userInformation;

  return (
    <div className="App">
      <div className="App-links">
        <Link to="/settings">Ustawienia</Link>
        <Link to="/change-password">Zmien haslo</Link>
        <Link to="/auth" onClick={logoutUser}>Wyloguj sie</Link>
      </div>
      <div>
        <h4>User profile yay</h4>
        <p>{user.username}, {user.email}</p>
        <p>{user.first_name}</p>
        <img src={user.image}></img>
      </div>
      <LandingPage />
    </div>
  );
}
