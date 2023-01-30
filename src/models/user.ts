import { model, Schema } from 'mongoose';
import isURL from 'validator/lib/isURL';

import type { IUser } from './user.types';

const userSchema = new Schema<IUser>({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  about: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 200,
  },
  avatar: {
    type: String,
    required: true,
    validate: {
      validator: (v: string) => isURL(v),
      message: 'Неправильный формат ссылки',
    },
  },
});

export default model<IUser>('user', userSchema);
