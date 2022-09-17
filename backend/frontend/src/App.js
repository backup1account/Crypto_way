import { Link } from "react-router-dom";


export default function App() {
  return (
    <div className="App">
      <div className="App-links">
        <Link to="/profile">Profil</Link>
        <Link to="/ranking">Ranking</Link>
        <Link to="/anyway">Anyway</Link>
        <Link to="/what">what</Link>
        <Link to="/auth">login</Link>
      </div>
    </div>
  );
}
