const User = require("../models/user");

const addFavorite = async (req, res) => {
  try {
    const { movieId } = req.params;

    const user = await User.findById(
      req.user.id
    );

    const alreadyExists =
      user.favorites.some(
        (fav) =>
          fav.movieId ===
          Number(movieId)
      );

    if (alreadyExists) {
      return res.status(400).json({
        success: false,
        message:
          "Movie already in favorites",
      });
    }

    user.favorites.push({
      movieId: Number(movieId),
    });

    await user.save();

    return res.json({
      success: true,
      message:
        "Added to favorites",
      favorites:
        user.favorites,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message:
        "Failed to add favorite",
    });
  }
};

const removeFavorite = async (
  req,
  res
) => {
  try {
    const { movieId } = req.params;

    const user = await User.findById(
      req.user.id
    );

    user.favorites =
      user.favorites.filter(
        (fav) =>
          fav.movieId !==
          Number(movieId)
      );

    await user.save();

    return res.json({
      success: true,
      message:
        "Removed from favorites",
      favorites:
        user.favorites,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message:
        "Failed to remove favorite",
    });
  }
};

const getFavorites = async (
  req,
  res
) => {
  try {
    const user = await User.findById(
      req.user.id
    );

    return res.json({
      success: true,
      favorites:
        user.favorites,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message:
        "Failed to fetch favorites",
    });
  }
};

const addWatchlist = async (
  req,
  res
) => {
  try {
    const { movieId } =
      req.params;

    const user =
      await User.findById(
        req.user.id
      );

    const exists =
      user.watchlist.some(
        (movie) =>
          movie.movieId ===
          Number(movieId)
      );

    if (exists) {
      return res.status(400).json({
        success: false,
        message:
          "Already in watchlist",
      });
    }

    user.watchlist.push({
      movieId:
        Number(movieId),
    });

    await user.save();

    return res.json({
      success: true,
      watchlist:
        user.watchlist,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message:
        "Failed to add watchlist",
    });
  }
};

const removeWatchlist =
  async (req, res) => {
    try {
      const { movieId } =
        req.params;

      const user =
        await User.findById(
          req.user.id
        );

      user.watchlist =
        user.watchlist.filter(
          (movie) =>
            movie.movieId !==
            Number(movieId)
        );

      await user.save();

      return res.json({
        success: true,
        watchlist:
          user.watchlist,
      });
    } catch (error) {
      console.error(error);

      return res.status(500).json({
        success: false,
        message:
          "Failed to remove watchlist",
      });
    }
  };

const getWatchlist =
  async (req, res) => {
    try {
      const user =
        await User.findById(
          req.user.id
        );

      return res.json({
        success: true,
        watchlist:
          user.watchlist,
      });
    } catch (error) {
      console.error(error);

      return res.status(500).json({
        success: false,
        message:
          "Failed to fetch watchlist",
      });
    }
  };



module.exports = {
  addFavorite,
  removeFavorite,
  getFavorites,

  addWatchlist,
  removeWatchlist,
  getWatchlist,
  
};