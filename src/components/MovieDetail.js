import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { fetchSingleMovie } from "../api";

import YouTube from "react-youtube";

const MovieDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [movie, setMovie] = useState(null);
  const [displayAllCast, setDisplayAllCast] = useState(false);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const movieDetails = await fetchSingleMovie(id);
        setMovie(movieDetails);
      } catch (error) {
        console.error("Error fetching movie details:", error);
      }
    };

    fetchMovieDetails();
  }, [id]);

  const handleGoBack = () => {
    navigate("/");
  };

  const toggleCastDisplay = () => {
    setDisplayAllCast(!displayAllCast);
  };

  const displayedCast = displayAllCast ? movie?.cast : movie?.cast.slice(0, 12);

  return (
    <div className="">
      <nav className="navbar navbar-dark bg-dark">
        <div className="container">
          <span className="navbar-brand mb-0 h1">
            {movie && movie.tagline ? (
              <span>{movie.tagline}</span>
            ) : (
              <span></span>
            )}
          </span>
          <button className="btn btn-light" onClick={handleGoBack}>
            Back To All Movies
          </button>
        </div>
      </nav>
      <div className="row mt-4 mx-2">
        <div className="col-lg-6">
          {movie && movie.video_id ? (
            <div>
              <YouTube
                videoId={movie.video_id}
                opts={{ width: "100%", height: "450" }}
              />
            </div>
          ) : (
            <p>No trailer available.</p>
          )}
        </div>
        <div className="col-lg-6">
          {movie ? (
            <div className="card">
              <div className="row g-0">
                <div className="col-md-8">
                  <div className="card-body">
                    <h5 className="card-title">{movie.title}</h5>
                    <p>
                      <strong>Genres:</strong>{" "}
                      {movie.genres ? movie.genres.join(", ") : "N/A"}
                    </p>
                    <p>
                      <strong>Length:</strong> {movie.length} minutes
                    </p>
                    <p>
                      <strong>Budget:</strong> {movie.budget} $
                    </p>
                    <p>
                      <strong>Revenue:</strong> {movie.revenue} $
                    </p>
                    <p>
                      <strong>Release Date:</strong> {movie.release_date}
                    </p>
                    <p>{movie.overview}</p>
                  </div>
                  <div>
                    <div className="row ms-2">
                      <p>
                        <strong>Recommended</strong>
                      </p>
                      {movie.recommendations.slice(0, 3).map((recom) => (
                        <div
                          key={recom.id}
                          className="col-12 col-sm-6 col-md-4 col-lg-3 mb-4"
                        >
                          <img
                            src={`https://image.tmdb.org/t/p/w500${recom.poster_path}`}
                            alt={recom.title}
                            className="img-fluid rounded-end"
                          />
                          {recom.title}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="col-md-4">
                  <img
                    src={movie.poster_url}
                    alt={movie.title}
                    className="img-fluid rounded-end"
                  />
                </div>
              </div>
            </div>
          ) : (
            <p>Loading...</p>
          )}
        </div>
        <div>
          {movie && movie.cast ? (
            <div className="mt-4 ">
              <div className="row my-3">
                <div className="col-lg-11">
                  <h4>Cast:</h4>
                </div>

                <div className="col-lg-1">
                  {!displayAllCast && movie.cast.length > 12 && (
                    <button
                      className="btn btn-secondary mt-2"
                      onClick={toggleCastDisplay}
                    >
                      See All Cast
                    </button>
                  )}
                </div>
              </div>
              <div className="row row-cols-2 row-cols-md-4  row-cols-xl-12 g-4">
                {displayedCast.map((castMember) => (
                  <div className="col col-lg-1" key={castMember.id}>
                    <div
                      className="card text-center"
                      style={{ height: "16rem" }}
                    >
                      <div>
                        <img
                          src={
                            castMember.profile_path
                              ? `https://image.tmdb.org/t/p/w185${castMember.profile_path}`
                              : "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1887&q=80"
                          }
                          alt={`${castMember.name} profile`}
                          className="img-fluid rounded-start"
                          style={{ height: "200px", objectFit: "contain" }}
                        />
                      </div>
                      <div className="">
                        <p className=""> {castMember.name}</p>
                        {/* <p className="">( {castMember.character} )</p> */}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <p>No cast</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default MovieDetail;
