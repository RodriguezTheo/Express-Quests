const database = require('./database');

const movies = [
  {
    id: 1,
    title: "Citizen Kane",
    director: "Orson Wells",
    year: "1941",
    colors: false,
    duration: 120,
  },
  {
    id: 2,
    title: "The Godfather",
    director: "Francis Ford Coppola",
    year: "1972",
    colors: true,
    duration: 180,
  },
  {
    id: 3,
    title: "Pulp Fiction",
    director: "Quentin Tarantino",
    year: "1994",
    color: true,
    duration: 180,
  },
];

const users = [
    {
      id: 1,
      firstname: "John",
      lastname: "Doe",
      mail: "john.doe@example.com",
    },
    {
      id: 2,
      firstname: "Jane",
      lastname: "Doe",
      mail: "jane.doe@example.com",
    },
    {
      id: 3,
      firstname: "Bob",
      lastname: "Smith",
      mail: "bob.smith@example.com",
    },
    {
      id: 4,
      firstname: "Alice",
      lastname: "Jones",
      mail: "alice.jones@example.com",
    },
    {
      id: 5,
      firstname: "James",
      lastname: "Brown",
      mail: "james.brown@example.com",
    },
];

const getMovies = (req, res) => {
  database
    .query("select * from movies")
    .then(([movies]) => {
      res.json(movies);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Error retrieving data from database");
    });
};

const getMovieById = (req, res) => {
  const id = parseInt(req.params.id);

  database
    .query("select * from movies where id = ?", [id])
    .then(([movies]) => {
      if (movies[0] != null) {
        res.json(movies[0]);
      } else {
        res.status(404).send("Not Found");
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Error retrieving data from database");
    });
};

module.exports = {
  getMovies,
  getMovieById,
};
