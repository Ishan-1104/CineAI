import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import {
  getFavorites,
  addFavorite,
  removeFavorite,
} from "../services/userService";

import {
  useAuth,
} from "./AuthContext";

const FavoritesContext =
  createContext();

export const FavoritesProvider =
  ({ children }) => {
    const { user } =
      useAuth();

    const [
      favorites,
      setFavorites,
    ] = useState([]);

    useEffect(() => {
      if (!user) return;

      loadFavorites();
    }, [user]);

    const loadFavorites =
      async () => {
        try {
          const data =
            await getFavorites();

          setFavorites(
            data.favorites
          );
        } catch (error) {
          console.error(error);
        }
      };

    const toggleFavorite =
      async (movieId) => {
        const exists =
          favorites.some(
            (fav) =>
              fav.movieId ===
              movieId
          );

        try {
          if (exists) {
            await removeFavorite(
              movieId
            );

            setFavorites(
              favorites.filter(
                (fav) =>
                  fav.movieId !==
                  movieId
              )
            );
          } else {
            await addFavorite(
              movieId
            );

            setFavorites([
              ...favorites,
              {
                movieId,
              },
            ]);
          }
        } catch (error) {
          console.error(error);
        }
      };

    return (
      <FavoritesContext.Provider
        value={{
          favorites,
          toggleFavorite,
        }}
      >
        {children}
      </FavoritesContext.Provider>
    );
  };

export const useFavorites =
  () =>
    useContext(
      FavoritesContext
    );