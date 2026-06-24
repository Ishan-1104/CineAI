const recommendationService = require(
  "../services/recommendation.service"
);

const tmdbService = require(
  "../services/tmdb.service"
);

const recommendMovies = async (req, res) => {
  try {
    const { movie } = req.body;

    if (!movie) {
      return res.status(400).json({
        success: false,
        message: "Movie is required",
      });
    }

    // Get recommendations from Python model
    const result =
      await recommendationService.getRecommendations(
        movie
      );

      
    console.log(
    "Python Recommendations:",
    result.recommendations
    );

    if (
      !result.success ||
      !result.recommendations
    ) {
      return res.status(404).json({
        success: false,
        message:
          result.message ||
          "No recommendations found",
      });
    }

    // Enrich recommendation titles with TMDB data
    const enrichedMovies = [];

for (const movieTitle of result.recommendations) {
  try {
    const movie =
      await tmdbService.searchMovieByTitle(
        movieTitle
      );

    if (movie) {
      enrichedMovies.push(movie);
    }
  } catch (error) {
    console.error(
      `Failed for ${movieTitle}`
    );
  }
}

    // Remove null values if TMDB doesn't find a movie
    const validMovies =
      enrichedMovies.filter(Boolean);

    console.log(
    "Python Recommendations:",
    result.recommendations.length
    );

    console.log(
    "TMDB Results:",
    validMovies.length
    );

    return res.status(200).json({
      success: true,
      count: validMovies.length,
      recommendations: validMovies,
    });
  } catch (error) {
    console.error(
      "Recommendation Error:",
      error
    );

    return res.status(500).json({
      success: false,
      message: "Recommendation failed",
      error: error.message,
    });
  }
};


module.exports = {
  recommendMovies,
};