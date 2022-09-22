import { Link, useNavigate } from "react-router-dom";


export default function App() {
  const navigate = useNavigate();

  const Logout = () => {
    localStorage.removeItem('user');
    navigate('/auth');
  };

  return (
    <div className="App">
      <div className="App-links">
        <Link to="/settings">Ustawienia</Link>
        <Link to="/auth" onClick={Logout} >Wyloguj sie</Link>
      </div>
    </div>
  );
}
