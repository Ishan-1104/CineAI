import Hero from "../../components/home/Hero/Hero";
import SearchSection from "../../components/search/SearchSection/SearchSection";

import RecommendationGrid from "../../components/movie/RecommendationGrid/RecommendationGrid";

const HomePage = () => {
  return (
    <>
      <Hero />
      <SearchSection />
      <RecommendationGrid />
    </>
  );
};

export default HomePage;