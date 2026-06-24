const express = require("express");
const cors = require("cors");

const app = express();
const movieRoutes = require("./routes/movie.routes");

const recommendationRoutes = require("./routes/recommendation.routes");

const authRoutes = require("./routes/auth.routes");

const userRoutes = require("./routes/user.routes");

app.use(cors());
app.use(express.json());
app.use("/api/movies", movieRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);


app.use("/api/recommendations",recommendationRoutes);

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Movie Recommendation API Running",
  });
});

app.get("/api/test-db", async (req, res) => {
  const mongoose = require("mongoose");

  res.json({
    connected:
      mongoose.connection.readyState === 1,
    database:
      mongoose.connection.name,
  });
});

module.exports = app;