import api from "./api";

export const getFavorites =
  async () => {
    const response =
      await api.get(
        "/users/favorites",
        {
          headers: {
            Authorization:
              `Bearer ${localStorage.getItem(
                "token"
              )}`,
          },
        }
      );

    return response.data;
  };

export const addFavorite =
  async (movieId) => {
    const response =
      await api.post(
        `/users/favorites/${movieId}`,
        {},
        {
          headers: {
            Authorization:
              `Bearer ${localStorage.getItem(
                "token"
              )}`,
          },
        }
      );

    return response.data;
  };

export const removeFavorite =
  async (movieId) => {
    const response =
      await api.delete(
        `/users/favorites/${movieId}`,
        {
          headers: {
            Authorization:
              `Bearer ${localStorage.getItem(
                "token"
              )}`,
          },
        }
      );

    return response.data;
  };

export const getMovieById =
  async (movieId) => {
    const response =
      await api.get(
        `/movies/${movieId}`
      );

    return response.data.movie;
  };