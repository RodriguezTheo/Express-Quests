const express = require("express");
require("dotenv").config();
const { validateMovie, validateUser } = require('./validators.js');

const app = express();
const port = process.env.APP_PORT ?? 5000;

app.use(express.json());

const welcome = (req, res) => {
  res.send("Welcome to my favourite movie list");
};

app.get("/", welcome);

const movieHandlers = require("./movieHandlers");
const usersHandlers = require('./usersHandlers');

app.get("/api/movies", movieHandlers.getMovies);
app.get("/api/movies/:id", movieHandlers.getMovieById);
app.get("/api/users", usersHandlers.getUsers);
app.get("/api/users/:id", usersHandlers.getUsersById);

app.post('/api/movies', validateMovie, movieHandlers.postMovie);
app.post('/api/users', validateUser, usersHandlers.postUser);

app.put('/api/movies/:id', validateMovie, movieHandlers.updateMovie);
app.put('/api/users/:id', validateUser, usersHandlers.updateUser);

app.delete('/api/movies/:id', movieHandlers.deleteMovie);
app.delete('/api/users/:id', usersHandlers.deleteUser);

app.listen(port, (err) => {
  if (err) {
    console.error("Something bad happened");
  } else {
    console.log(`Server is listening on ${port}`);
  }
});
