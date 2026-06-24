import {
  useEffect,
  useState,
} from "react";

import {
  useFavorites,
} from "../../contexts/FavoritesContext";

import {
  getMovieById,
} from "../../services/userService";

import MovieCard from "../../components/movie/MovieCard/MovieCard";
import SkeletonCard from "../../components/ui/SkeletonCard/SkeletonCard";

const FavoritesPage = () => {
  const { favorites } =
    useFavorites();

  const [movies, setMovies] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    const fetchFavorites =
      async () => {
        try {
          const movieDetails =
            await Promise.all(
              favorites.map(
                (fav) =>
                  getMovieById(
                    fav.movieId
                  )
              )
            );

          setMovies(
            movieDetails.filter(
              Boolean
            )
          );
        } catch (error) {
          console.error(error);
        } finally {
          setLoading(false);
        }
      };

    fetchFavorites();
  }, [favorites]);

  if (loading) {
  return (
    <section
      className="
        max-w-7xl
        mx-auto
        px-6
        py-10
      "
    >
      <h1
        className="
          text-4xl
          font-bold
          mb-8
        "
      >
        My Favorites ❤️
      </h1>

      <div
        className="
          grid
          grid-cols-1
          sm:grid-cols-2
          md:grid-cols-3
          lg:grid-cols-4
          gap-6
        "
      >
        {[...Array(8)].map(
          (_, index) => (
            <SkeletonCard
              key={index}
            />
          )
        )}
      </div>
    </section>
  );
}

  return (
    <section
      className="
        max-w-7xl
        mx-auto
        px-6
        py-10
      "
    >
      <h1
        className="
          text-4xl
          font-bold
          mb-8
        "
      >
        My Favorites ❤️
      </h1>

      {movies.length === 0 ? (
        <div
          className="
            text-slate-400
          "
        >
          <div
  className="
    text-center
    py-20
  "
>
  <h2
    className="
      text-3xl
      font-bold
      mb-4
    "
  >
    ❤️ No Favorites Yet
  </h2>

  <p
    className="
      text-slate-400
    "
  >
    Start exploring movies and save
    your favorites.
  </p>
</div>
        </div>
      ) : (
        <div
          className="
            grid
            grid-cols-1
            sm:grid-cols-2
            md:grid-cols-3
            lg:grid-cols-4
            gap-6
          "
        >
          {movies.map(
            (movie) => (
              <MovieCard
                key={movie.id}
                movie={movie}
              />
            )
          )}
        </div>
      )}
    </section>
  );
};

export default FavoritesPage;