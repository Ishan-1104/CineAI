const express = require("express");

const {
  searchMovies,
  getMovieDetails,
  getMovieExtras,
} = require(
  "../controllers/movie.controller"
);

const router = express.Router();

router.get("/search", searchMovies);

router.get("/:id", getMovieDetails);

router.get("/:id/extras", getMovieExtras);

module.exports = router;