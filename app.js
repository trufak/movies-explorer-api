const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { errors: errorsCelebrate } = require('celebrate');
const helmet = require('helmet');
const errors = require('./middlewares/errors');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const cors = require('./middlewares/cors');
const router = require('./routes/index');
const limiter = require('./middlewares/limiter');

const app = express();
const { MONGOPATH, NODE_ENV } = process.env;

mongoose.connect(
  NODE_ENV === 'production'
    ? MONGOPATH
    : 'mongodb://127.0.0.1:27017/moviesdb',
);

/* подключение helmet */
app.use(helmet());
/* выставление заголовков cors */
app.use(cors);
/* парсинг тела запроса */
app.use(bodyParser.json());
/* логирование запросов */
app.use(requestLogger);
/* ограничение количества запросов */
app.use(limiter);
/* подключение роутеров */
app.use(router);
/* логирование ошибок */
app.use(errorLogger);
/* обработка ошибок celebrate */
app.use(errorsCelebrate());
/* обработка ошибок */
app.use(errors);

module.exports = app;
