import React, { useEffect, useState } from "react";
import { getBestRatedMovies } from "../api";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import MovieShow from "./MovieShow";

function Rated() {
  const [bestRatedMovies, setBestRatedMovies] = useState([]);
  const sliderRef = React.createRef();

  useEffect(() => {
    const fetchBestRated = async () => {
      try {
        const movies = await getBestRatedMovies();
        setBestRatedMovies(movies);
      } catch (error) {
        console.error("Error fetching best rated movies:", error);
      }
    };

    fetchBestRated();
  }, []);

  const settings = {
    variableWidth: true,
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
  };

  const movieList = bestRatedMovies.map((movie) => (
    <div key={movie.id}>
      <MovieShow movie={movie} showRate />
    </div>
  ));

  return (
    <div>
      <br />
      <h2 className="text-center text-danger">Best Rated Movies</h2>
      <Slider ref={sliderRef} {...settings}>
        {movieList}
      </Slider>
      <br />
    </div>
  );
}

export default Rated;
