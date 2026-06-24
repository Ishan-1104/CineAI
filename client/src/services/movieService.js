import api from "./api";

export const searchMovies = async (query) => {
  const response = await api.get("/movies/search", {
    params: { query },
  });

  return response.data.data;
};

export const getMovieDetails =
  async (movieId) => {
    const response =
      await api.get(
        `/movies/${movieId}`
      );

    return response.data.movie;
  };