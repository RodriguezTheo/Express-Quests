const { body, validationResult} = require('express-validator');

const validateMovie = [
  body("title").notEmpty().isLength({ max: 255 }).isString(),
  body("director").notEmpty().isLength({ max: 255 }).isString(),
  body("year").notEmpty().isLength({ max: 255 }).isString(),
  body("color").notEmpty().isLength({ max: 255 }).isString(),
  body("duration").notEmpty().isInt(),
  (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      res.status(422).json({ validationErrors: errors.array() });
    } else {
      next();
    }
  },
];

const validateUser = [
  body("email").isEmail(),
  body("firstname").isLength({ max: 255 }).isString(),
  body("lastname").isLength({ max: 255 }).isString(),
  (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      res.status(422).json({ validationErrors: errors.array() });
    } else {
      next();
    }
  },
];

module.exports = {
  validateMovie,
  validateUser,
};

