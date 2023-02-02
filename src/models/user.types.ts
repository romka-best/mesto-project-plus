import { Model, Document } from 'mongoose';

export interface IUser {
  email: string;
  password: string;
  name: string;
  about: string;
  avatar: string;
}

export interface UserModel extends Model<IUser> {
  findUserByCredentials: (email: string, password: string) =>
    Promise<Document<unknown, any, IUser>>;
}
