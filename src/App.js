import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";

import MovieDetailPage from "./pages/MovieDetailPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="movie/:id" element={<MovieDetailPage />} />
      </Routes>
    </Router>
  );
}

export default App;
