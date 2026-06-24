import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { getMovieDetails } from "../../services/movieDetailsService";
import { getMovieExtras } from "../../services/movieExtrasService";

import SimilarMovies from "../../components/movie/SimilarMovies/SimilarMovies";

const IMAGE_BASE_URL =
  "https://image.tmdb.org/t/p/original";

const MovieDetailsPage = () => {
  const { id } = useParams();

  const [movie, setMovie] = useState(null);

  const [cast, setCast] = useState([]);

  const [trailer, setTrailer] =
    useState(null);

  const [similarMovies,
    setSimilarMovies] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const movieData =
          await getMovieDetails(id);

        setMovie(movieData);

        const extras =
        await getMovieExtras(id);

        setCast(extras.cast);

        setTrailer(extras.trailer);

        setSimilarMovies(
          extras.similar
        );
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchMovie();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white">
        Loading...
      </div>
    );
  }

  if (!movie) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white">
        Movie not found
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      {/* HERO SECTION */}
      <div
        className="
          relative
          min-h-[70vh]
          bg-cover
          bg-center
        "
        style={{
          backgroundImage: `url(${IMAGE_BASE_URL}${movie.backdrop_path})`,
        }}
      >
        <div
          className="
            absolute
            inset-0
            bg-gradient-to-r
            from-black/90
            via-black/60
            to-black/80
          "
        />

        <div
          className="
            relative
            max-w-7xl
            mx-auto
            min-h-[70vh]
            flex
            items-center
            px-6
          "
        >
          <div
            className="
              flex
              flex-col
              md:flex-row
              gap-8
            "
          >
            <img
              src={`${IMAGE_BASE_URL}${movie.poster_path}`}
              alt={movie.title}
              className="
                w-72
                rounded-3xl
                shadow-2xl
              "
            />

            <div className="max-w-3xl">
              <h1
                className="
                  text-5xl
                  font-bold
                  mb-4
                "
              >
                {movie.title}
              </h1>

              <p
                className="
                  text-slate-300
                  text-lg
                  leading-relaxed
                "
              >
                {movie.overview}
              </p>

              {/* GENRES */}
              <div
                className="
                  flex
                  flex-wrap
                  gap-3
                  mt-6
                "
              >
                {movie.genres?.map(
                  (genre) => (
                    <span
                      key={genre.id}
                      className="
                        px-4
                        py-2
                        rounded-full
                        bg-red-500/20
                        text-red-400
                      "
                    >
                      {genre.name}
                    </span>
                  )
                )}
              </div>

              {/* STATS */}
              <div
                className="
                  flex
                  flex-wrap
                  gap-6
                  mt-8
                  text-lg
                "
              >
                <span>
                  ⭐ {movie.vote_average?.toFixed(1)}
                </span>

                <span>
                  {movie.runtime} min
                </span>

                <span>
                  {movie.release_date}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* TRAILER */}
{trailer && (
  <section
    className="
      max-w-7xl
      mx-auto
      px-6
      py-16
    "
  >
    <h2
      className="
        text-3xl
        font-bold
        mb-8
      "
    >
      Trailer
    </h2>

    <div
      className="
        aspect-video
        rounded-3xl
        overflow-hidden
      "
    >
      <iframe
        className="
          w-full
          h-full
        "
        src={`https://www.youtube.com/embed/${trailer.key}`}
        allowFullScreen
        title="Movie Trailer"
      />
    </div>
  </section>
)}

      {/* CAST */}
      <section
        className="
          max-w-7xl
          mx-auto
          px-6
          py-16
        "
      >
        <h2
          className="
            text-3xl
            font-bold
            mb-8
          "
        >
          Cast
        </h2>

        <div
          className="
            grid
            grid-cols-2
            md:grid-cols-5
            gap-6
          "
        >
          {cast.map((actor) => (
            <div
              key={actor.id}
              className="
                bg-slate-900
                rounded-2xl
                overflow-hidden
              "
            >
              <img
                src={`https://image.tmdb.org/t/p/w300${actor.profile_path}`}
                alt={actor.name}
                className="
                  h-60
                  w-full
                  object-cover
                "
              />

              <div className="p-3">
                <h3
                  className="
                    font-medium
                  "
                >
                  {actor.name}
                </h3>

                <p
                  className="
                    text-sm
                    text-slate-400
                  "
                >
                  {actor.character}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* SIMILAR MOVIES */}
      <SimilarMovies
        movies={similarMovies}
      />
    </div>
  );
};

export default MovieDetailsPage;