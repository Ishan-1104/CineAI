import axios from "axios";

const API =
  import.meta.env.VITE_API_URL ||
  "http://localhost:5000";

export const registerUser =
  async (userData) => {
    const response =
      await axios.post(
        `${API}/auth/register`,
        userData
      );

    return response.data;
  };

export const loginUser =
  async (userData) => {
    const response =
      await axios.post(
        `${API}/auth/login`,
        userData
      );

    return response.data;
  };

export const getCurrentUser =
  async (token) => {
    const response =
      await axios.get(
        `${API}/auth/me`,
        {
          headers: {
            Authorization:
              `Bearer ${token}`,
          },
        }
      );

    return response.data;
  };