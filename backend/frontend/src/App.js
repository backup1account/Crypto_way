import { useContext } from "react";
import { Link } from "react-router-dom";
import AuthContext from "./Authentication/Auth";
import LandingPage from "./routes/Landing";


export default function App() {
  let { logoutUser } = useContext(AuthContext);

  return (
    <div className="App">
      <div className="App-links">
        <Link to="/settings">Ustawienia</Link>
        <Link to="/change-password">Zmien haslo</Link>
        <Link to="/auth" onClick={logoutUser} >Wyloguj sie</Link>
      </div>
      <LandingPage />
    </div>
  );
}
