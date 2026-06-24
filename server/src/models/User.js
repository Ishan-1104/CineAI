const mongoose = require("mongoose");

const userSchema =
  new mongoose.Schema(
    {
      name: {
        type: String,
        required: true,
      },

      email: {
        type: String,
        required: true,
        unique: true,
      },

      password: {
        type: String,
        required: true,
      },

      avatar: {
        type: String,
        default: "",
      },

      favorites: [
        {
            movieId: {
            type: Number,
            required: true,
            },
            addedAt: {
            type: Date,
            default: Date.now,
            },
        },
    ],

      watchlist: [
        {
            movieId: {
            type: Number,
            required: true,
            },
            addedAt: {
            type: Date,
            default: Date.now,
            },
        },
      ],

      searchHistory: [
        {
          type: String,
        },
      ],
    },
    {
      timestamps: true,
    }
  );

module.exports =
  mongoose.model(
    "user",
    userSchema
  );