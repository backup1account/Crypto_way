import { Link } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Link to="/profile">Profil</Link>
      <Link to="/ranking">Ranking</Link>
      <Link to="/anyway">Anyway</Link>
      <Link to="/what">what</Link>
      <Link to="/auth">login</Link>
    </div>
  );
}

export default App;
