const express = require("express");
const app = express();
const movies = require("./movies.json");
const fs = require("fs");
const bodyParser = require("body-parser");

app.use(bodyParser.json());

app.get("/", function (req, res) {
  return res.json(movies);
});

app.get("/:movieName", function (req, res) {
  const { movieName: name } = req.params;

  const movie = movies.filter(function (movie) {
    return String(movie.name).toLowerCase() === String(name).toLowerCase();
  });

  return res.json(movie);
});

// TODO handle errors
app.post("/:movieName", function (req, res) {
  const { movieName: name } = req.params;
  const { imdb, cast } = req.body;

  const newMovies = [
    ...movies,
    {
      name,
      imdb,
      cast,
    },
  ];

  return fs.writeFile(
    "./movies.js",
    JSON.stringify(newMovies),
    function (err, _) {
      return res.json(newMovies);
    }
  );
});

app.listen(3000);
