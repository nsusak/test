import React, { useEffect, useState } from "react";
import { getUpcomingMovies } from "../api";
import MovieShow from "./MovieShow";
import "bootstrap/dist/css/bootstrap.min.css";

const Upcoming = () => {
  const [upcomingMovies, setUpcomingMovies] = useState([]);

  useEffect(() => {
    const fetchUpcomingMovies = async () => {
      try {
        const movies = await getUpcomingMovies();
        setUpcomingMovies(movies);
      } catch (error) {
        console.error("Error fetching upcoming movies:", error);
      }
    };

    fetchUpcomingMovies();
  }, []);

  const movieList = upcomingMovies.map((movie) => (
    <div key={movie.id} className="col-12 col-sm-6 col-md-4 col-lg-3 mb-4">
      <MovieShow movie={movie} />
    </div>
  ));

  return (
    <div className="mt-3">
      <div className="row">
        <div className="col">
          <h2 className="text-center text-danger">Upcoming Movies</h2>
        </div>
      </div>
      <div className="row">{movieList}</div>
    </div>
  );
};

export default Upcoming;
