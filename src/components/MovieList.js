import React, { useEffect, useState } from "react";
import { getMovieList } from "../api";
import MovieShow from "./MovieShow";
import "bootstrap/dist/css/bootstrap.min.css";

const MovieList = ({ searchTerm }) => {
  const [movies, setMovies] = useState([]);
  const [totalResults, setTotalResults] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const { totalResults, movies } = await getMovieList(
          searchTerm,
          currentPage
        );
        setTotalResults(totalResults);
        setMovies(movies);
      } catch (error) {
        console.error("Error fetching movies:", error);
      }
    };

    fetchMovies();
  }, [searchTerm, currentPage]);

  const handleNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const handlePrevPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  return (
    <div className="">
      <h2 className="text-center text-danger">Total Results: {totalResults}</h2>
      <div className="row">
        {movies.map((movie) => (
          <div
            key={movie.id}
            className="col-12 col-sm-6 col-md-4 col-lg-3 mb-4"
          >
            <MovieShow movie={movie} />
          </div>
        ))}
      </div>

      <div className="row text-center">
        <div className="col">
          <button
            onClick={handlePrevPage}
            disabled={currentPage === 1}
            className="btn btn-secondary "
          >
            Previous
          </button>
          <button
            onClick={handleNextPage}
            disabled={movies.length < 20}
            className="btn btn-secondary ms-2"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default MovieList;
