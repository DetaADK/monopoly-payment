import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="bg-lime-700 text-white p-4 flex gap-4">
      <Link to="/">Scan</Link>
      <Link to="/players">Players</Link>
      <Link to="/register-player">Register Player</Link>
      <Link to="/register-place">Register Place</Link>
    </div>
  );
};

export default Navbar;
