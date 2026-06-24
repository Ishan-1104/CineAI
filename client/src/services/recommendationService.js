import api from "./api";

export const getRecommendations = async (
  movie
) => {
  const response = await api.post(
    "/recommendations",
    {
      movie,
    }
  );

  return response.data;
};