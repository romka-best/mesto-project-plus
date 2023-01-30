import { HydratedDocument } from 'mongoose';

import { IUser } from '../../models/user.types';

export default function getUserBody(
  user: HydratedDocument<unknown, any, IUser> & IUser,
): IUser & { _id: any } {
  return {
    _id: user._id,
    name: user.name,
    about: user.about,
    avatar: user.avatar,
  };
}
