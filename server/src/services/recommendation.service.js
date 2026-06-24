const express = require("express");
const cors = require("cors");
const path = require("path");

const app = express();

const movieRoutes = require("./routes/movie.routes");
const recommendationRoutes = require("./routes/recommendation.routes");
const authRoutes = require("./routes/auth.routes");
const userRoutes = require("./routes/user.routes");

app.use(cors());
app.use(express.json());

/* API Routes */
app.use("/api/movies", movieRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/recommendations", recommendationRoutes);

/* Health Check */
app.get("/api/test-db", async (req, res) => {
  const mongoose = require("mongoose");

  res.json({
    connected:
      mongoose.connection.readyState === 1,
    database:
      mongoose.connection.name,
  });
});

/* Serve React Build */
app.use(
  express.static(
    path.join(
      __dirname,
      "../../client/dist"
    )
  )
);

/* React Router Support */
app.get(/.*/, (req, res) => {
  res.sendFile(
    path.join(
      __dirname,
      "../../client/dist/index.html"
    )
  );
});

module.exports = app;