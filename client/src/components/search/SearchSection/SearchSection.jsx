import Autocomplete from "../Autocomplete/Autocomplete";
import Button from "../../ui/Button/Button";

import { useNavigate } from "react-router-dom";

import toast from "react-hot-toast";

import { useSearch } from "../../../contexts/SearchContext";
import { useRecommendations } from "../../../contexts/RecommendationContext";
import { useAuth } from "../../../contexts/AuthContext";

import { getRecommendations } from "../../../services/recommendationService";

const SearchSection = () => {
  const navigate = useNavigate();

  const { selectedMovie } =
    useSearch();

  const { user } =
    useAuth();

  const {
    setRecommendations,
    loading,
    setLoading,
  } = useRecommendations();

  const handleRecommend =
    async () => {
      if (!user) {
        toast.error(
          "Please login to get AI recommendations"
        );

        navigate("/login");

        return;
      }

      if (!selectedMovie) {
        toast.error(
          "Please select a movie first"
        );

        return;
      }

      try {
        setLoading(true);

        toast.loading(
          "Finding recommendations...",
          {
            id: "recommendation",
          }
        );

        const result =
          await getRecommendations(
            selectedMovie.title
          );

        setRecommendations(
          result.recommendations
        );

        toast.success(
          "Recommendations found!",
          {
            id: "recommendation",
          }
        );

        navigate(
          "/recommendations"
        );
      } catch (error) {
        console.error(
          "Recommendation Error:",
          error
        );

        toast.error(
          "Failed to fetch recommendations",
          {
            id: "recommendation",
          }
        );
      } finally {
        setLoading(false);
      }
    };

  return (
    <section className="max-w-4xl mx-auto px-6 py-10">
      <div
        className="
          bg-slate-900/50
          border
          border-slate-800
          rounded-3xl
          p-6
          backdrop-blur-lg
        "
      >
        <h2
          className="
            text-2xl
            font-semibold
            mb-6
          "
        >
          Find Your Next Favorite Movie
        </h2>

        <div className="flex gap-4">
          <div className="flex-1">
            <Autocomplete />
          </div>

          <Button
            onClick={
              handleRecommend
            }
          >
            {loading
              ? "Finding..."
              : "Recommend"}
          </Button>
        </div>
      </div>
    </section>
  );
};

export default SearchSection;