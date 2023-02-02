import { HydratedDocument } from 'mongoose';

import { IUser } from '../../models/user.types';

import { IUserBody } from './types';

export default function getUserBody(
  user: HydratedDocument<unknown, any, IUser> & IUser,
): IUserBody {
  return {
    _id: user._id,
    email: user.email,
    name: user.name,
    about: user.about,
    avatar: user.avatar,
  };
}
