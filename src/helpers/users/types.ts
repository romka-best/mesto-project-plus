import { IUser } from '../../models/user.types';

export interface IUserBody extends Omit<IUser, 'password'> {
  _id: any;
}
