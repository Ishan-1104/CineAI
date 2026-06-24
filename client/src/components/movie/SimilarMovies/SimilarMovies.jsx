import MovieCard
from "../MovieCard/MovieCard";

const SimilarMovies = ({
  movies,
}) => {
  return (
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
        More Like This
      </h2>

      <div
        className="
          grid
          grid-cols-2
          md:grid-cols-5
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
    </section>
  );
};

export default SimilarMovies;