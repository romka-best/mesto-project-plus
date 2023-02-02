import type { Request } from 'express';
import type { JwtPayload } from 'jsonwebtoken';

export interface IRequest extends Request {
  user?: { _id: JwtPayload | string };
}
