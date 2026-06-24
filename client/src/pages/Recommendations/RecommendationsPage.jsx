import RecommendationGrid from "../../components/movie/RecommendationGrid/RecommendationGrid";

import { useRecommendations } from "../../contexts/RecommendationContext";

const RecommendationsPage = () => {
  const { recommendations } =
    useRecommendations();

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
        AI Recommendations 🎬
      </h1>

      {recommendations.length === 0 ? (
        <div
          className="
            text-center
            text-slate-400
            py-20
          "
        >
          No recommendations yet.
          Search for a movie first.
        </div>
      ) : (
        <RecommendationGrid />
      )}
    </section>
  );
};

export default RecommendationsPage;