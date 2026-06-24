import { useEffect, useState } from "react";

import { searchMovies } from "../../../services/movieService";

import useDebounce from "../../../hooks/useDebounce";

import { useSearch } from "../../../contexts/SearchContext";

const IMAGE_BASE_URL =
  "https://image.tmdb.org/t/p/w200";

const Autocomplete = () => {
  const [query, setQuery] = useState("");

  const [movies, setMovies] = useState([]);

  const [loading, setLoading] = useState(false);

  const debouncedQuery = useDebounce(query, 500);

  const { setSelectedMovie } = useSearch();
  
  console.log(useSearch());

  useEffect(() => {
    const fetchMovies = async () => {
      if (debouncedQuery.trim().length < 3) {
        setMovies([]);
        return;
      }

      try {
        setLoading(true);

        const data = await searchMovies(
          debouncedQuery
        );

        setMovies(data.slice(0, 6));
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, [debouncedQuery]);

  return (
    <div className="relative">
      <input
        type="text"
        placeholder="Search a movie..."
        value={query}
        onChange={(e) =>
          setQuery(e.target.value)
        }
        className="
          w-full
          rounded-xl
          px-4
          py-3
          bg-slate-900
          border
          border-slate-700
        "
      />

      {loading && (
        <div className="absolute mt-2 text-sm text-slate-400">
          Searching...
        </div>
      )}

      {movies.length > 0 && (
        <div
          className="
            absolute
            mt-2
            w-full
            bg-slate-900
            border
            border-slate-700
            rounded-xl
            overflow-hidden
            z-50
          "
        >
          {movies.map((movie) => (
            <button
              key={movie.id}
              onClick={() => {
                setSelectedMovie(movie);
                setQuery(movie.title);
                setMovies([]);
              }}
              className="
                w-full
                flex
                items-center
                gap-4
                p-3
                hover:bg-slate-800
                transition
              "
            >
              <img
                src={`${IMAGE_BASE_URL}${movie.poster_path}`}
                alt={movie.title}
                className="
                  h-16
                  w-12
                  object-cover
                  rounded
                "
              />

              <div className="text-left">
                <p className="font-medium">
                  {movie.title}
                </p>

                <p className="text-sm text-slate-400">
                  {movie.release_date?.slice(0, 4)}
                </p>
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
  
};

export default Autocomplete;