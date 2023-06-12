const database = require('./database');

const getUsers = (req, res) => {
  const initialSql = "select * from users";
  const where = [];

  if(req.query.language != null){
    where.push({
        column: 'language',
        value: req.query.language,
        operator: '=',
      });
  }

  if(req.query.city != null){
    where.push({
      column: 'city',
      value: req.query.city,
      operator: '=',
    });  
  }

  database.query(
    where.reduce((sql, {column, operator}, index) => `${sql} ${index === 0 ? "where" : "and"} ${column} ${operator} ?`, initialSql),
    where.map(({value}) => value)
  )
  .then(([result]) => {
    const users = result.map((user) => {
      const { hashedPassword, ...otherProperties } = user;
      return otherProperties;
    })
    res.json(users)
  })
  .catch((err) => {
    console.error(err);
    res.status(500).send("Error retrieving data from users");
  });
};

const getUsersById = (req, res) => {
  const id = parseInt(req.params.id);

  database
    .query("select id, firstname, lastname, email, city, language from users where id = ?", [id])
    .then(([users]) => {
      if (users[0] != null) {
        res.json(users[0]);
      } else {
        res.status(404).send("Not Found");
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Error retrieving data from database");
    });
};

const updateUser = (req, res) => {
  const id = parseInt(req.params.id);
  const {firstname, lastname, email, city, language, hashedPassword} = req.body
  database.query(`UPDATE users SET firstname = ?, lastname = ?, email = ?, city = ?, language = ?, hashedPassword = ? WHERE id = ?`, [firstname, lastname, email, city, language,hashedPassword, id])
  .then(([result]) => {
    if(result.affectedRows === 0){
      res.status(404).send("Not Found");
    }else{
      res.sendStatus(204);
    }
  })
  .catch((err) => {
    console.error(err);
    res.status(500).send("Error editing user");
  })
};

const deleteUser = (req, res) => {
  const id = parseInt(req.params.id);
  database.query("delete from users where id = ?", [id])
  .then(([result]) => {
    if(result.affectedRows === 0){
      res.status(404).send("Not found");
    }else{
      res.sendStatus(204);
    }
  })
  .catch((err) => {
    console.error(err);
    res.status(500).send("Error deleting the user");
  })
};

const postUser = (req, res) => {
  const {firstname, lastname, email, city, language, hashedPassword} = req.body
  database.query(`INSERT INTO users (firstname, lastname, email, city, language, hashedPassword) VALUES (?, ?, ?, ?, ?, ?)`, [firstname, lastname, email, city, language, hashedPassword])
  .then(([result]) => {
    res.location(`/api/users/${result.insertId}`).sendStatus(201);
  })
  .catch((err) => {
    console.error(err);
    res.status(500).send("Error saving the user")
  })
};



module.exports = {
  getUsers,
  getUsersById,
  postUser,
  updateUser,
  deleteUser,
};