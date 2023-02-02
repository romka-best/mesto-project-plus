import { HydratedDocument } from 'mongoose';

import { IUser } from '../../models/user.types';

import { IUserBody } from './types';

export default function getUsersBody(
  users: Array<HydratedDocument<unknown, any, IUser> & IUser>,
): Array<IUserBody> {
  const usersBody: Array<IUserBody> = [];

  users.forEach((user) => {
    usersBody.push({
      _id: user._id,
      email: user.email,
      name: user.name,
      about: user.about,
      avatar: user.avatar,
    });
  });

  return usersBody;
}
