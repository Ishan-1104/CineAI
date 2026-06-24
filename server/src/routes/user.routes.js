const express = require(
  "express"
);

const auth = require(
  "../middlewares/auth.middleware"
);

const {
  addFavorite,
  removeFavorite,
  getFavorites,

  addWatchlist,
  removeWatchlist,
  getWatchlist,
} = require(
  "../controllers/user.controller"
);

const router =
  express.Router();

router.post(
  "/favorites/:movieId",
  auth,
  addFavorite
);

router.delete(
  "/favorites/:movieId",
  auth,
  removeFavorite
);

router.get(
  "/favorites",
  auth,
  getFavorites
);

router.post(
  "/watchlist/:movieId",
  auth,
  addWatchlist
);

router.delete(
  "/watchlist/:movieId",
  auth,
  removeWatchlist
);

router.get(
  "/watchlist",
  auth,
  getWatchlist
);

module.exports = router;