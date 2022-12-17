const router = require('express').Router();
const {
  getMovies,
  createMovie,
  deleteMovie,
} = require('../controllers/movies');
const {
  movieValidator,
  idValidator,
} = require('../utils/celebrateValidators');

/* возвращает все сохранённые текущим  пользователем фильмы */
router.get('/', getMovies);
/* создаёт фильм с переданными в теле */
router.post('/', movieValidator, createMovie);
/* удаляет сохранённый фильм по id */
router.delete('/:id', idValidator, deleteMovie);

module.exports = router;
