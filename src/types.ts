import type { Request } from 'express';
import type { ObjectId } from 'mongoose';

export interface IRequest extends Request {
  user?: { _id: ObjectId | string };
}
