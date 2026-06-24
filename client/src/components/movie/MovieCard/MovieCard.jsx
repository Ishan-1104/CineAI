import { motion } from "framer-motion";
import { Link } from "react-router-dom";

import {
  FaHeart,
  FaRegHeart,
  FaBookmark,
  FaRegBookmark,
} from "react-icons/fa";

import {
  useFavorites,
} from "../../../contexts/FavoritesContext";

import {
  useWatchlist,
} from "../../../contexts/WatchlistContext";

import {
  useAuth,
} from "../../../contexts/AuthContext";

const IMAGE_BASE_URL =
  "https://image.tmdb.org/t/p/w500";

const MovieCard = ({ movie }) => {
  const { user } =
    useAuth();

  const {
    favorites,
    toggleFavorite,
  } = useFavorites();

  const {
    watchlist,
    toggleWatchlist,
  } = useWatchlist();

  const isFavorite =
    favorites.some(
      (fav) =>
        fav.movieId === movie.id
    );

  const isWatchlist =
    watchlist.some(
      (item) =>
        item.movieId === movie.id
    );

  const handleFavorite =
    async (e) => {
      e.preventDefault();
      e.stopPropagation();

      if (!user) {
        alert(
          "Please login first"
        );
        return;
      }

      await toggleFavorite(
        movie.id
      );
    };

  const handleWatchlist =
    async (e) => {
      e.preventDefault();
      e.stopPropagation();

      if (!user) {
        alert(
          "Please login first"
        );
        return;
      }

      await toggleWatchlist(
        movie.id
      );
    };

  return (
    <Link
      to={`/movie/${movie.id}`}
    >
      <motion.div
        whileHover={{
          y: -8,
          scale: 1.03,
        }}
        transition={{
          duration: 0.2,
        }}
        className="
          relative
          overflow-hidden
          rounded-2xl
          bg-slate-900
          border
          border-slate-800
          shadow-lg
          cursor-pointer
        "
      >
        <button
          onClick={
            handleFavorite
          }
          className="
            absolute
            top-3
            right-3
            z-20
            p-2
            rounded-full
            bg-black/60
            backdrop-blur-md
            hover:scale-110
            transition
          "
        >
          {isFavorite ? (
            <FaHeart
              size={20}
              className="
                text-red-500
              "
            />
          ) : (
            <FaRegHeart
              size={20}
              className="
                text-white
              "
            />
          )}
        </button>

        <img
          src={`${IMAGE_BASE_URL}${movie.poster_path}`}
          alt={movie.title}
          className="
            w-full
            h-[350px]
            object-cover
          "
        />

        <div className="p-4">
          <h3
            className="
              font-semibold
              text-lg
              line-clamp-1
            "
          >
            {movie.title}
          </h3>

          <div
            className="
              flex
              justify-between
              items-center
              mt-3
            "
          >
            <span className="text-yellow-400">
              ⭐ {movie.vote_average?.toFixed(
                1
              )}
            </span>

            <div
              className="
                flex
                items-center
                gap-3
              "
            >
              <button
                onClick={
                  handleWatchlist
                }
                className="
                  hover:scale-110
                  transition
                "
              >
                {isWatchlist ? (
                  <FaBookmark
                    className="
                      text-blue-500
                    "
                  />
                ) : (
                  <FaRegBookmark
                    className="
                      text-slate-400
                    "
                  />
                )}
              </button>

              <span className="text-slate-400">
                {movie.release_date?.slice(
                  0,
                  4
                )}
              </span>
            </div>
          </div>
        </div>
      </motion.div>
    </Link>
  );
};

export default MovieCard;