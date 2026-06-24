import api from "./api";

export const getWatchlist =
  async () => {
    const response =
      await api.get(
        "/users/watchlist",
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

export const addWatchlist =
  async (movieId) => {
    const response =
      await api.post(
        `/users/watchlist/${movieId}`,
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

export const removeWatchlist =
  async (movieId) => {
    const response =
      await api.delete(
        `/users/watchlist/${movieId}`,
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