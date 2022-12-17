const router = require('express').Router();
const {
  userValidator,
} = require('../utils/celebrateValidators');
const {
  updateUser,
  getCurrentUser,
} = require('../controllers/users');

/* получение данных текущего пользователя */
router.get('/me', getCurrentUser);
/* обновление данных пользователя */
router.patch('/me', userValidator, updateUser);

module.exports = router;
