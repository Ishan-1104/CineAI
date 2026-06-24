import api from "./api";

export const getMovieExtras =
  async (movieId) => {
    const response =
      await api.get(
        `/movies/${movieId}/extras`
      );

    return response.data;
  };