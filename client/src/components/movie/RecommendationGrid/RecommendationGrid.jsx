import { useRecommendations } from "../../../contexts/RecommendationContext";

import MovieCard from "../MovieCard/MovieCard";

const RecommendationGrid = () => {
  const { recommendations } =
    useRecommendations();

  if (!recommendations.length)
    return null;

  return (
    <section className="max-w-7xl mx-auto px-6 py-12">
      <h2
        className="
          text-4xl
          font-bold
          mb-10
        "
      >
        Recommended Movies
      </h2>

      <div
        className="
          grid
          grid-cols-1
          sm:grid-cols-2
          md:grid-cols-3
          lg:grid-cols-5
          gap-6
        "
      >
        {recommendations.map(
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

export default RecommendationGrid;