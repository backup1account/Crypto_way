import { Link, useNavigate } from "react-router-dom";
import LandingPage from "./routes/Landing";


export default function App() {
  const navigate = useNavigate();

  const Logout = () => {
    localStorage.clear();
    navigate('/auth');
  };

  return (
    <div className="App">
      <div className="App-links">
        <Link to="/settings">Ustawienia</Link>
        <Link to="/change-password">Zmien haslo</Link>
        <Link to="/auth" onClick={Logout} >Wyloguj sie</Link>
      </div>
      <LandingPage />
    </div>
  );
}
