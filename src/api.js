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

    console.log(moviesWithGenres, "Best Rated Movies");
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

    console.log(moviesWithGenres, "Upcoming Movies");
    return moviesWithGenres;
  } catch (error) {
    console.error("Error fetching upcoming movies:", error);
    throw error;
  }
};

const fetchSingleMovie = async (movieId) => {
  try {
    const response = await axios.get(`${apiUrl}/movie/${movieId}`, {
      params: {
        api_key: apiKey,
      },
    });
    console.log(response, " response iz fetch single");
    return response.data;
  } catch (error) {
    console.error(`Error fetching movie with ID ${movieId}:`, error);
    throw error;
  }
};

export {
  getMovieList,
  getBestRatedMovies,
  getUpcomingMovies,
  fetchSingleMovie,
};
