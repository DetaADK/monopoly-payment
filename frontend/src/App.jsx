import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import ScanPage from "./components/ScanPage";
import UserList from "./components/UserList";
import RegisterPlayer from "./components/RegisterPlayer";
import RegisterPlace from "./components/RegisterPlace";
import Navbar from "./Navbar";

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-zinc-800">
        {/* Navbar */}
        <Navbar />

        {/* Routing halaman */}
        <Routes>
          <Route path="/" element={<ScanPage />} />
          <Route path="/players" element={<UserList />} />
          <Route path="/register-player" element={<RegisterPlayer />} />
          <Route path="/register-place" element={<RegisterPlace />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
