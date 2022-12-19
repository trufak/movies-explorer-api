const Movie = require('../models/movie');
const NotFoundError = require('../errors/NotFoundError');
const ServerError = require('../errors/ServerError');
const BadRequestError = require('../errors/BadRequestError');
const ForbiddenError = require('../errors/ForbiddenError');
const errorMessages = require('../utils/errorMessages');

const getMovies = (req, res, next) => {
  Movie.find({
    owner: req.user._id,
  })
    .then((docs) => {
      if (docs) res.send(docs);
      else next(new NotFoundError(errorMessages.userNotFound));
    })
    .catch(() => {
      next(new ServerError(errorMessages.serverError));
    });
};

const createMovie = (req, res, next) => {
  Movie.create({ ...req.body, owner: req.user._id })
    .then((document) => {
      const movie = document.toObject();
      res.send({ data: movie });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError(errorMessages.userBadRequest));
      } else next(new ServerError(errorMessages.serverError));
    });
};

const deleteMovie = (req, res, next) => {
  Movie.findById(req.params.id)
    .then((document) => {
      if (document) {
        const movie = document.toObject();
        if (movie.owner.toString() === req.user._id) {
          document.remove()
            .then(() => res.send({ data: movie }))
            .catch(next);
        } else next(new ForbiddenError(errorMessages.cardDeleteNotOwner));
      } else next(new NotFoundError(errorMessages.cardNotFound));
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequestError(errorMessages.cardBadRequest));
      } else next(new ServerError(errorMessages.serverError));
    });
};

module.exports = {
  getMovies,
  createMovie,
  deleteMovie,
};
