import type { Request } from 'express';
import { Schema } from 'mongoose';

export interface IRequest extends Request {
  user?: {
    _id: Schema.Types.ObjectId | string;
  };
}
