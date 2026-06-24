const tmdbRequest = require(
  "../utils/tmdbRequest"
);

const searchMovies = async (query) => {
  try {
    const response = await tmdbRequest(
      "https://api.themoviedb.org/3/search/movie",
      {
        params: {
          api_key: process.env.TMDB_API_KEY,
          query,
        },
      }
    );

    return response.results || [];
  } catch (error) {
    console.error(
      "TMDB SEARCH ERROR:",
      error.message
    );

    return [];
  }
};

const searchMovieByTitle = async (
  title
) => {
  let retries = 3;

  while (retries > 0) {
    try {
      const response = await tmdbRequest(
        "https://api.themoviedb.org/3/search/movie",
        {
          params: {
            api_key: process.env.TMDB_API_KEY,
            query: title,
          },
        }
      );

      const exactMatch =
        response.results?.find(
          (movie) =>
            movie.title?.toLowerCase() ===
            title.toLowerCase()
        );

      const movie =
        exactMatch ||
        response.results?.[0];

      if (!movie) {
        return null;
      }

      return {
        id: movie.id,
        title: movie.title,
        poster_path:
          movie.poster_path,
        backdrop_path:
          movie.backdrop_path,
        overview:
          movie.overview,
        vote_average:
          movie.vote_average,
        release_date:
          movie.release_date,
      };
    } catch (error) {
      retries--;

      if (retries === 0) {
        console.error(
          `TMDB failed for "${title}"`
        );

        return null;
      }

      await new Promise((resolve) =>
        setTimeout(resolve, 500)
      );
    }
  }
};

const getMovieDetails = async (
  movieId
) => {
  try {
    return await tmdbRequest(
      `https://api.themoviedb.org/3/movie/${movieId}`,
      {
        params: {
          api_key: process.env.TMDB_API_KEY,
        },
      }
    );
  } catch (error) {
    console.error(
      "MOVIE DETAILS ERROR:",
      error.message
    );

    return null;
  }
};

const getMovieCredits = async (
  movieId
) => {
  try {
    const response = await tmdbRequest(
      `https://api.themoviedb.org/3/movie/${movieId}/credits`,
      {
        params: {
          api_key: process.env.TMDB_API_KEY,
        },
      }
    );

    return (
      response.cast?.slice(0, 10) || []
    );
  } catch (error) {
    console.error(
      "CREDITS ERROR:",
      error.message
    );

    return [];
  }
};

const getMovieVideos = async (
  movieId
) => {
  try {
    const response = await tmdbRequest(
      `https://api.themoviedb.org/3/movie/${movieId}/videos`,
      {
        params: {
          api_key: process.env.TMDB_API_KEY,
        },
      }
    );

    const videos =
      response.results || [];

    const trailer =
      videos.find(
        (video) =>
          video.site ===
            "YouTube" &&
          video.type ===
            "Trailer"
      ) ||
      videos.find(
        (video) =>
          video.site ===
          "YouTube"
      ) ||
      null;

    console.log(
      "TRAILERS FOUND:",
      videos.length
    );

    console.log(
      "SELECTED TRAILER:",
      trailer?.name
    );

    return trailer;
  } catch (error) {
    console.error(
      "VIDEOS ERROR:",
      error.message
    );

    return null;
  }
};

const getSimilarMovies = async (
  movieId
) => {
  try {
    const response = await tmdbRequest(
      `https://api.themoviedb.org/3/movie/${movieId}/similar`,
      {
        params: {
          api_key: process.env.TMDB_API_KEY,
        },
      }
    );

    const results =
      response.results || [];

    if (results.length > 0) {
      return results.slice(0, 10);
    }

    const recommendation =
      await tmdbRequest(
        `https://api.themoviedb.org/3/movie/${movieId}/recommendations`,
        {
          params: {
            api_key:
              process.env
                .TMDB_API_KEY,
          },
        }
      );

    return (
      recommendation.results?.slice(
        0,
        10
      ) || []
    );
  } catch (error) {
    console.error(
      "SIMILAR ERROR:",
      error.message
    );

    return [];
  }
};

module.exports = {
  searchMovies,
  searchMovieByTitle,
  getMovieDetails,
  getMovieCredits,
  getMovieVideos,
  getSimilarMovies,
};