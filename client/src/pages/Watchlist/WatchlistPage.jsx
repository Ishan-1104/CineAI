import {
  useEffect,
  useState,
} from "react";

import {
  useWatchlist,
} from "../../contexts/WatchlistContext";

import {
  getMovieById,
} from "../../services/userService";

import MovieCard from "../../components/movie/MovieCard/MovieCard";
import SkeletonCard from "../../components/ui/SkeletonCard/SkeletonCard";

const WatchlistPage = () => {
  const { watchlist } =
    useWatchlist();

  const [movies, setMovies] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    const fetchWatchlist =
      async () => {
        try {
          const movieDetails =
            await Promise.all(
              watchlist.map(
                (movie) =>
                  getMovieById(
                    movie.movieId
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

    fetchWatchlist();
  }, [watchlist]);

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
        My Watchlist 📌
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
        My Watchlist 📌
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
    📌 Watchlist Empty
  </h2>

  <p
    className="
      text-slate-400
    "
  >
    Add movies to your watchlist and
    come back later.
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

export default WatchlistPage;