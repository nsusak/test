import axios from "axios";

const apiKey = "863e86b41b9bbc10d09d252973897073";
const apiUrl = "https://api.themoviedb.org/3";

const fetchGenres = async () => {
  try {
    const genresResponse = await axios.get(`${apiUrl}/genre/movie/list`, {
      params: {
        api_key: apiKey,
      },
    });
    const genreMap = {};
    genresResponse.data.genres.forEach((genre) => {
      genreMap[genre.id] = genre.name;
    });
    return genreMap;
  } catch (error) {
    console.error("Error fetching genres:", error);
    throw error;
  }
};

const fetchMovieCast = async (movieId) => {
  try {
    const creditsUrl = `https://api.themoviedb.org/3/movie/${movieId}/credits`;

    const response = await axios.get(creditsUrl, {
      params: {
        api_key: apiKey,
      },
    });

    const cast = response.data.cast;
    return cast;
  } catch (error) {
    console.error("Error fetching movie cast:", error);
    throw error;
  }
};

const fetchMovies = async (endpoint, queryParams) => {
  try {
    const response = await axios.get(`${apiUrl}/${endpoint}`, {
      params: {
        api_key: apiKey,
        ...queryParams,
      },
    });
    return response.data.results;
  } catch (error) {
    console.error(`Error fetching ${endpoint}:`, error);
    throw error;
  }
};

const getMovieList = async (searchTerm, page = 1) => {
  try {
    const apiKey = "863e86b41b9bbc10d09d252973897073";
    const apiUrl = "https://api.themoviedb.org/3/search/movie";
    const genresUrl = "https://api.themoviedb.org/3/genre/movie/list";

    const [moviesResponse, genresResponse] = await Promise.all([
      axios.get(apiUrl, {
        params: {
          api_key: apiKey,
          sort_by: "popularity.desc",
          query: searchTerm,
          page: page,
        },
      }),
      axios.get(genresUrl, {
        params: {
          api_key: apiKey,
        },
      }),
    ]);

    const genreMap = {};
    genresResponse.data.genres.forEach((genre) => {
      genreMap[genre.id] = genre.name;
    });

    const moviesWithGenres = moviesResponse.data.results.map((movie) => ({
      ...movie,
      genres: movie.genre_ids.map((genreId) => genreMap[genreId]),
    }));

    return {
      totalResults: moviesResponse.data.total_results,
      movies: moviesWithGenres,
    };
  } catch (error) {
    console.error("Error fetching movie list:", error);
    throw error;
  }
};

const getBestRatedMovies = async () => {
  try {
    const genreMap = await fetchGenres();

    const moviesResponse = await fetchMovies("discover/movie", {
      sort_by: "vote_average.desc",
      page: 1,
    });

    const moviesWithGenres = moviesResponse.map((movie) => ({
      ...movie,
      genres: movie.genre_ids.map((genreId) => genreMap[genreId]),
    }));

    return moviesWithGenres;
  } catch (error) {
    console.error("Error fetching best rated movies:", error);
    throw error;
  }
};

const getUpcomingMovies = async () => {
  try {
    const genreMap = await fetchGenres();

    const moviesResponse = await fetchMovies("movie/upcoming", {
      page: 1,
    });

    const moviesWithGenres = moviesResponse.map((movie) => ({
      ...movie,
      genres: movie.genre_ids.map((genreId) => genreMap[genreId]),
    }));

    return moviesWithGenres;
  } catch (error) {
    console.error("Error fetching upcoming movies:", error);
    throw error;
  }
};
const fetchSingleMovie = async (movieId) => {
  try {
    const cast = await fetchMovieCast(movieId);
    const movieUrl = `${apiUrl}/movie/${movieId}`;
    const videosUrl = `${apiUrl}/movie/${movieId}/videos`;
    const recommendationsUrl = `${apiUrl}/movie/${movieId}/recommendations`;
    const [movieResponse, videosResponse, recommendsResponse] =
      await Promise.all([
        axios.get(movieUrl, { params: { api_key: apiKey } }),
        axios.get(videosUrl, { params: { api_key: apiKey } }),
        axios.get(recommendationsUrl, { params: { api_key: apiKey } }),
      ]);

    const movie = movieResponse.data;
    const recommendations = recommendsResponse.data.results;

    const genres = movie.genres.map((genreId) => genreId.name);

    const videoId =
      videosResponse.data.results.length > 0
        ? `${videosResponse.data.results[0].key}`
        : null;

    const movieDetails = {
      id: movie.id,
      title: movie.title,
      poster_url: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
      genres: genres,
      length: movie.runtime,
      release_date: movie.release_date,
      video_id: videoId,
      tagline: movie.tagline,
      budget: movie.budget,
      overview: movie.overview,
      revenue: movie.revenue,
      recommendations,
      cast,
    };
    console.log(movieDetails);
    return movieDetails;
  } catch (error) {
    console.error("Error fetching movie details:", error);
    throw error;
  }
};

export {
  getMovieList,
  getBestRatedMovies,
  getUpcomingMovies,
  fetchSingleMovie,
};
