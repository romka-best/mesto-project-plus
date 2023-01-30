import { HydratedDocument } from 'mongoose';

import { IUser } from '../../models/user.types';

export default function getUsersBody(
  users: Array<HydratedDocument<unknown, any, IUser> & IUser>,
): Array<IUser & { _id: any }> {
  const usersBody: Array<IUser & { _id: any }> = [];

  users.forEach((user) => {
    usersBody.push({
      _id: user._id,
      name: user.name,
      about: user.about,
      avatar: user.avatar,
    });
  });

  return usersBody;
}
