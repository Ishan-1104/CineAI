import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import {
  getWatchlist,
  addWatchlist,
  removeWatchlist,
} from "../services/watchlistService";

import {
  useAuth,
} from "./AuthContext";

const WatchlistContext =
  createContext();

export const WatchlistProvider =
  ({ children }) => {
    const { user } =
      useAuth();

    const [
      watchlist,
      setWatchlist,
    ] = useState([]);

    useEffect(() => {
      if (!user) return;

      loadWatchlist();
    }, [user]);

    const loadWatchlist =
      async () => {
        try {
          const data =
            await getWatchlist();

          setWatchlist(
            data.watchlist
          );
        } catch (error) {
          console.error(error);
        }
      };

    const toggleWatchlist =
      async (movieId) => {
        const exists =
          watchlist.some(
            (movie) =>
              movie.movieId ===
              movieId
          );

        try {
          if (exists) {
            await removeWatchlist(
              movieId
            );

            setWatchlist(
              watchlist.filter(
                (movie) =>
                  movie.movieId !==
                  movieId
              )
            );
          } else {
            await addWatchlist(
              movieId
            );

            setWatchlist([
              ...watchlist,
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
      <WatchlistContext.Provider
        value={{
          watchlist,
          toggleWatchlist,
        }}
      >
        {children}
      </WatchlistContext.Provider>
    );
  };

export const useWatchlist =
  () =>
    useContext(
      WatchlistContext
    );