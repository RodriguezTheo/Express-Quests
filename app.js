const express = require("express");
require("dotenv").config();
const { hashPassword, verifyPassword, verifyToken, verifyUserId } = require("./auth.js");
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

// Public Routes
// Movies
app.get("/api/movies", movieHandlers.getMovies);
app.get("/api/movies/:id", movieHandlers.getMovieById);
// Users
app.get("/api/users", usersHandlers.getUsers);
app.get("/api/users/:id", usersHandlers.getUserById);

app.post(
  "/api/login",
  usersHandlers.getUserByEmailWithPasswordAndPassToNext,
  verifyPassword
);

// Auth Routes
// Movies
app.post('/api/movies',verifyToken, validateMovie, movieHandlers.postMovie);
app.put('/api/movies/:id',verifyToken, validateMovie, movieHandlers.updateMovie);
app.delete('/api/movies/:id',verifyToken, movieHandlers.deleteMovie);
// Users
app.post('/api/users',validateUser, hashPassword, usersHandlers.postUser);
app.put('/api/users/:id',verifyToken, verifyUserId ,hashPassword, usersHandlers.updateUser);
app.delete('/api/users/:id',verifyToken, verifyUserId, usersHandlers.deleteUser);



app.listen(port, (err) => {
  if (err) {
    console.error("Something bad happened");
  } else {
    console.log(`Server is listening on ${port}`);
  }
});
