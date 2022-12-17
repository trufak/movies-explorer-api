const mongoose = require('mongoose');
const validator = require('validator');
/* const bcrypt = require('bcryptjs'); */
/* const errorMessages = require('../utils/errorMessages');
const UnauthorizedError = require('../errors/UnauthorizedError'); */

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      minlength: 2,
      maxlength: 30,
      default: 'Жак',
    },
    email: {
      type: String,
      required: true,
      unique: true,
      validate: {
        validator(email) {
          return validator.isEmail(email);
        },
        message: (props) => `${props.value} - некорректный e-mail!`,
      },
    },
    password: {
      type: String,
      required: true,
      select: false,
    },
  },
  { versionKey: false },
);

/* userSchema.statics.findUserByCredentials = function _f(email, password) {
  return this.findOne({ email }).select('+password')
    .then((document) => {
      if (!document) {
        throw new UnauthorizedError(errorMessages.unauthorized);
      }
      return bcrypt.compare(password, document.password)
        .then((matched) => {
          if (!matched) {
            throw new UnauthorizedError(errorMessages.unauthorized);
          }

          const user = document.toObject();
          delete user.password;
          return user;
        });
    });
}; */

module.exports = mongoose.model('user', userSchema);
