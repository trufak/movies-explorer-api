const router = require('express').Router();
const usersRouter = require('./users');
/* const moviesRouter = require('./movies'); */
const auth = require('../middlewares/auth');
const {
  userBodyValidator,
  userLoginValidator,
} = require('../utils/celebrateValidators');
const { login, createUser } = require('../controllers/users');
const NotFoundError = require('../errors/NotFoundError');
const errorMessages = require('../utils/errorMessages');

/* авторизация */
router.post('/signin', userLoginValidator, login);
/* регистрация */
router.post('/signup', userBodyValidator, createUser);
/* маршрутизация */
router.use('/users', auth, usersRouter);

router.use('*', auth, (req, res, next) => {
  next(new NotFoundError(errorMessages.incorrectRoute));
});

module.exports = router;
