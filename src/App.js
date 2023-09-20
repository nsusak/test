import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import SearchBar from "./components/SearchBar";
import Rated from "./components/Rated";
import Upcoming from "./components/Upcoming";
import MovieList from "./components/MovieList";
import MovieDetail from "./components/MovieDetail";
import { getMovieList } from "./api";

function App() {
  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = async (term) => {
    setSearchTerm(term);
    const result = await getMovieList(term);
    setMovies(result);
  };

  return (
    <Router>
      <div>
        <SearchBar onSubmit={handleSearch} />
        <Routes>
          {searchTerm && (
            <Route
              path="/"
              element={<MovieList movies={movies} searchTerm={searchTerm} />}
            />
          )}
          <Route path="/movie/:id" element={<MovieDetail />} />
        </Routes>

        <div>
          <Rated />
        </div>

        <div>
          <Upcoming />
        </div>
      </div>
    </Router>
  );
}

export default App;
