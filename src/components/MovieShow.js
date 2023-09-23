import React, { useState } from "react";
import { Link } from "react-router-dom";

const MovieShow = ({ movie, showRate }) => {
  const [showFullDescription, setShowFullDescription] = useState(false);
  const genres = movie.genres ? movie.genres.join(", ") : "N/A";
  const fallbackImageURL =
    "https://images.unsplash.com/photo-1609743522653-52354461eb27?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3774&q=80";
  const imageUrl =
    movie.poster_path !== null
      ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
      : fallbackImageURL; // Use fallback image if movie poster is not available

  const description = showFullDescription
    ? movie.overview
    : `${movie.overview.substring(0, 100)}...`;

  const toggleDescription = () => {
    setShowFullDescription(!showFullDescription);
  };
  const linkStyle = {
    textDecoration: "none",
    color: "inherit",
  };

  return (
    <div>
      <Link to={`/movie/${movie.id}`} style={linkStyle}>
        <div className="card mb-3 ms-2 shadow" style={{ maxWidth: "540px" }}>
          <div className="row g-0">
            <div className="col-md-4 ">
              <img
                className="img-fluid rounded-start"
                src={imageUrl}
                alt="poster"
                style={{ height: "300px", objectFit: "cover" }}
              />
            </div>
            <div className="col-md-8">
              <div className="card-body">
                <h5 className="card-title">{movie.title}</h5>
                <p className="card-text">
                  {showRate && (
                    <React.Fragment>
                      <br />
                      <strong>Rating:</strong> {movie.vote_average}
                    </React.Fragment>
                  )}
                  <br />
                  <strong>Release Date:</strong> {movie.release_date}
                  <br />
                  <strong>Genres:</strong> {genres}
                  <br />
                  <strong>Description:</strong> {description}
                  {movie.overview.length > 150 && (
                    <button
                      onClick={(e) => {
                        toggleDescription();
                        e.preventDefault();
                      }}
                      className="btn btn-outline-danger"
                    >
                      {showFullDescription ? "Read Less" : "Read More"}
                    </button>
                  )}
                </p>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default MovieShow;
