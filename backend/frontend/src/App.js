import { Link } from "react-router-dom";


export default function App() {
  const Logout = () => {
    localStorage.removeItem('user');
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
