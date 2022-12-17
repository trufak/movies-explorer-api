const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const BadRequestError = require('../errors/BadRequestError');
const NotFoundError = require('../errors/NotFoundError');
const ServerError = require('../errors/ServerError');
const ConflictError = require('../errors/ConflictError');
const errorMessages = require('../utils/errorMessages');

const { NODE_ENV, JWT_SECRET } = process.env;

const getCurrentUser = (req, res, next) => {
  User.findById(req.user._id)
    .then((user) => {
      if (user) res.send({ data: user });
      else next(new NotFoundError(errorMessages.userNotFound));
    })
    .catch(() => {
      next(new ServerError(errorMessages.serverError));
    });
};

const login = (req, res, next) => {
  const { email, password } = req.body;
  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign(
        { _id: user._id },
        NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret',
        { expiresIn: '7d' },
      );
      res
        .send({ token });
    })
    .catch((err) => {
      if (err.name === 'UnauthorizedError') next(err);
      else next(new ServerError(errorMessages.serverError));
    });
};

const createUser = (req, res, next) => {
  const {
    name,
    email,
    password,
  } = req.body;
  bcrypt.hash(password, 10)
    .then((hash) => User.create({
      name,
      email,
      password: hash,
    }))
    .then((document) => {
      const user = document.toObject();
      delete user.password;
      res.send({ data: user });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError(errorMessages.userBadRequest));
      } else if (err.code === 11000) {
        next(new ConflictError(errorMessages.userConflict));
      } else next(new ServerError(errorMessages.serverError));
    });
};

const updateUser = (req, res, next) => {
  const { name, email } = req.body;
  User.findByIdAndUpdate(
    req.user._id,
    { name, email },
    {
      new: true,
      runValidators: true,
    },
  )
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      if (err.name === 'CastError' || err.name === 'ValidationError') {
        next(new BadRequestError(errorMessages.userBadRequest));
      } else next(new ServerError(errorMessages.serverError));
    });
};

module.exports = {
  createUser,
  updateUser,
  login,
  getCurrentUser,
};
