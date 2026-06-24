const axios = require("axios");

const sleep = (ms) =>
  new Promise((resolve) =>
    setTimeout(resolve, ms)
  );

const tmdbRequest = async (
  url,
  options = {},
  retries = 3
) => {
  try {
    const response =
      await axios.get(url, {
        timeout: 10000,
        ...options,
      });

    return response.data;
  } catch (error) {
    if (
      retries > 0 &&
      (
        error.code === "ECONNRESET" ||
        error.code === "ETIMEDOUT"
      )
    ) {
      console.log(
        `Retrying ${url}... (${retries} left)`
      );

      await sleep(1000);

      return tmdbRequest(
        url,
        options,
        retries - 1
      );
    }

    throw error;
  }
};

module.exports = tmdbRequest;