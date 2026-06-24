const express = require("express");

const {
  recommendMovies,
} = require("../controllers/recommendation.controller");

const router = express.Router();

router.post("/", recommendMovies);

module.exports = router;
