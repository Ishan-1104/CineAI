const express = require(
  "express"
);

const auth = require(
  "../middlewares/auth.middleware"
);

const {
  register,
  login,
  getCurrentUser,
} = require(
  "../controllers/auth.controller"
);

const router =
  express.Router();

router.post(
  "/register",
  register
);

router.post(
  "/login",
  login
);

router.get(
  "/me",
  auth,
  getCurrentUser
);

module.exports = router;