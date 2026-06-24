const { spawn } = require("child_process");
const path = require("path");

const getRecommendations = (movieName) => {
  return new Promise((resolve, reject) => {
    const pythonProcess = spawn("python3", [
      path.join(__dirname, "../python/recommend.py"),
      movieName,
    ]);

    let dataBuffer = "";
    let errorBuffer = "";

    pythonProcess.stdout.on("data", (data) => {
      dataBuffer += data.toString();
    });

    pythonProcess.stderr.on("data", (data) => {
      errorBuffer += data.toString();
    });

    pythonProcess.on("close", (code) => {
      if (code !== 0) {
        reject(errorBuffer);
        return;
      }

      try {
        const result = JSON.parse(dataBuffer);
        resolve(result);
      } catch (error) {
        reject(error);
      }
    });
  });
};

module.exports = {
  getRecommendations,
};