const tmdbService = require("../services/tmdb.service");

const searchMovies = async (req, res) => {
  try {
    const { query } = req.query;

    if (!query) {
      return res.status(400).json({
        success: false,
        message: "Query is required",
      });
    }

    const movies = await tmdbService.searchMovies(query);

    if (!movies) {
  return res.json({
    success: true,
    data: [],
  });
}

    res.json({
      success: true,
      data: movies,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

const getMovieDetails = async (
  req,
  res
) => {
  try {
    const { id } = req.params;

    const movie =
      await tmdbService.getMovieDetails(
        id
      );

    if (!movie) {
      return res.status(404).json({
        success: false,
        message: "Movie not found",
      });
    }

    return res.status(200).json({
      success: true,
      movie,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message:
        "Failed to fetch movie details",
    });
  }
};

const getMovieExtras = async (
  req,
  res
) => {
  try {
    const { id } = req.params;

    const [
      cast,
      trailer,
      similar,
    ] = await Promise.all([
      tmdbService.getMovieCredits(id),
      tmdbService.getMovieVideos(id),
      tmdbService.getSimilarMovies(id),
    ]);

    res.json({
      success: true,
      cast,
      trailer,
      similar,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message:
        "Failed to fetch extras",
    });
  }
};


module.exports = {
  searchMovies,
  getMovieDetails,
  getMovieExtras,
};