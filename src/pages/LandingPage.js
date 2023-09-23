import React, { useState } from "react";
import MovieList from "../components/MovieList";
import SearchBar from "../components/SearchBar";
import { getMovieList } from "../api";
import Rated from "../components/Rated";
import Upcoming from "../components/Upcoming";

const LandingPage = () => {
  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = async (term) => {
    setSearchTerm(term);
    const result = await getMovieList(term);

    setMovies(result);
  };
  return (
    <div className="row">
      <SearchBar onSubmit={handleSearch} />
      {searchTerm && <MovieList movies={movies} searchTerm={searchTerm} />}
      {!searchTerm && <Rated />}
      {!searchTerm && <Upcoming />}
    </div>
  );
};

export default LandingPage;
