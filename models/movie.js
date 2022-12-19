const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema(
  {
    nameRU: {
      type: String,
      required: true,
    },
    nameEn: {
      type: String,
      required: true,
    },
    country: {
      type: String,
      required: true,
    },
    director: {
      type: String,
      required: true,
    },
    duration: {
      type: Number,
      required: true,
    },
    year: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
      validate: {
        validator(link) {
          return /^https?:\/\/(www.)?[a-zA-Z0-9-]+\.[a-zA-Z0-9]+[\w-._~:/?#[\]@!$'()*+,;=]*#?/.test(link);
        },
        message: (props) => `${props.value} - некорректный url!`,
      },
    },
    trailerLink: {
      type: String,
      required: true,
      validate: {
        validator(link) {
          return /^https?:\/\/(www.)?[a-zA-Z0-9-]+\.[a-zA-Z0-9]+[\w-._~:/?#[\]@!$'()*+,;=]*#?/.test(link);
        },
        message: (props) => `${props.value} - некорректный url!`,
      },
    },
    thumbnail: {
      type: String,
      required: true,
      validate: {
        validator(link) {
          return /^https?:\/\/(www.)?[a-zA-Z0-9-]+\.[a-zA-Z0-9]+[\w-._~:/?#[\]@!$'()*+,;=]*#?/.test(link);
        },
        message: (props) => `${props.value} - некорректный url!`,
      },
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user',
      required: true,
    },
    movieId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
  },
  { versionKey: false },
);

module.exports = mongoose.model('movie', movieSchema);
