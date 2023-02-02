import { Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';

import AuthRequiredError from '../errors/AuthRequiredError';

import { IRequest } from '../types';

const extractBearerToken = (header: string) => header.replace('Bearer ', '');

export default (req: IRequest, res: Response, next: NextFunction) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    throw new AuthRequiredError('Need auth');
  }

  const token = extractBearerToken(authorization);
  let payload;

  try {
    payload = jwt.verify(token, 'super-strong-secret');
  } catch (err) {
    throw new AuthRequiredError('Need auth');
  }

  req.user = payload as { _id: JwtPayload };

  next();
};
