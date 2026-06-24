import api from "./api";

export const getMovieDetails = async (
  movieId
) => {
  const response = await api.get(
    `/movies/${movieId}`
  );

  return response.data.movie;
};