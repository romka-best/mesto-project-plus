import { model, Schema } from 'mongoose';
import validator from 'validator';
import bcrypt from 'bcryptjs';

import AuthRequiredError from '../errors/AuthRequiredError';

import type { IUser, UserModel } from './user.types';

const userSchema = new Schema<IUser, UserModel>({
  email: {
    type: String,
    unique: true,
    required: true,
    validate: {
      validator: (email: string) => validator.isEmail(email),
      message: 'Incorrect email format',
    },
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
  name: {
    type: String,
    minlength: 2,
    maxlength: 30,
    default: 'Жак-Ив Кусто',
  },
  about: {
    type: String,
    minlength: 2,
    maxlength: 200,
    default: 'Исследователь',
  },
  avatar: {
    type: String,
    default: 'https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png',
    validate: {
      validator: (v: string) => validator.isURL(v),
      message: 'Incorrect link format',
    },
  },
});

userSchema.static('findUserByCredentials', function findUserByCredentials(email: string, password: string) {
  return this
    .findOne({ email })
    .select('+password')
    .then((user) => {
      if (!user) {
        return Promise.reject(new AuthRequiredError('Email or password is wrong'));
      }

      return bcrypt
        .compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            return Promise.reject(new AuthRequiredError('Email or password is wrong'));
          }

          return user;
        });
    });
});

export default model<IUser, UserModel>('user', userSchema);
