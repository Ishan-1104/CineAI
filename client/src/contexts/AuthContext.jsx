import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import {
  loginUser,
  registerUser,
  getCurrentUser,
} from "../services/authService";

const AuthContext =
  createContext();

export const AuthProvider = ({
  children,
}) => {
  const [user, setUser] =
    useState(null);

  const [token, setToken] =
    useState(
      localStorage.getItem("token")
    );

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    const loadUser =
      async () => {
        try {
          if (!token) {
            setLoading(false);
            return;
          }

          const data =
            await getCurrentUser(
              token
            );

          setUser(data.user);
        } catch (error) {
          console.error(error);

          localStorage.removeItem(
            "token"
          );

          setToken(null);
        } finally {
          setLoading(false);
        }
      };

    loadUser();
  }, [token]);

  const login = async (
    credentials
  ) => {
    const data =
      await loginUser(
        credentials
      );

    localStorage.setItem(
      "token",
      data.token
    );

    setToken(data.token);

    setUser(data.user);

    return data;
  };

  const register =
    async (userData) => {
      const data =
        await registerUser(
          userData
        );

      localStorage.setItem(
        "token",
        data.token
      );

      setToken(data.token);

      setUser(data.user);

      return data;
    };

  const logout = () => {
    localStorage.removeItem(
      "token"
    );

    setUser(null);

    setToken(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        loading,
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () =>
  useContext(AuthContext);