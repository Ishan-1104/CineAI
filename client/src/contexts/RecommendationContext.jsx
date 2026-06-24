import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

const RecommendationContext =
  createContext();

export const RecommendationProvider =
  ({ children }) => {
    const [
      recommendations,
      setRecommendationsState,
    ] = useState(() => {
      const saved =
        localStorage.getItem(
          "recommendations"
        );

      return saved
        ? JSON.parse(saved)
        : [];
    });

    const [
      loading,
      setLoading,
    ] = useState(false);

    const setRecommendations =
      (movies) => {
        setRecommendationsState(
          movies
        );

        localStorage.setItem(
          "recommendations",
          JSON.stringify(
            movies
          )
        );
      };

    const clearRecommendations =
      () => {
        setRecommendationsState(
          []
        );

        localStorage.removeItem(
          "recommendations"
        );
      };

    useEffect(() => {
      localStorage.setItem(
        "recommendations",
        JSON.stringify(
          recommendations
        )
      );
    }, [recommendations]);

    return (
      <RecommendationContext.Provider
        value={{
          recommendations,
          setRecommendations,
          clearRecommendations,
          loading,
          setLoading,
        }}
      >
        {children}
      </RecommendationContext.Provider>
    );
  };

export const useRecommendations =
  () =>
    useContext(
      RecommendationContext
    );