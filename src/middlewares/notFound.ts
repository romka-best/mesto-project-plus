import { NextFunction, Response } from 'express';

import NotFoundError from '../errors/NotFoundError';
import { IRequest } from '../types';

export default (req: IRequest, res: Response, next: NextFunction) => {
  next(new NotFoundError('Страница не найдена'));
};
