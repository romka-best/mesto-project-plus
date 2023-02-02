import { Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

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

  // @ts-ignore
  req.user = { _id: payload._id };

  next();
};
