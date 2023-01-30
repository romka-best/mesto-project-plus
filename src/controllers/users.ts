import type { Request, Response, NextFunction } from 'express';

import NotFoundError from '../errors/NotFoundError';
import ServerError from '../errors/ServerError';

import User from '../models/user';

import getUserBody from '../helpers/users/getUserBody';
import getUsersBody from '../helpers/users/getUsersBody';

import ClientError from '../errors/ClientError';

import { IRequest } from '../types';

export const createUser = (req: Request, res: Response, next: NextFunction) => {
  const {
    name,
    about,
    avatar,
  } = req.body;

  return User
    .create({
      name,
      about,
      avatar,
    })
    .then((user) => res.send(getUserBody(user)))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new ClientError('Your data is not correct'));
      } else {
        next(err);
      }
    });
};

export const getUsers = (req: Request, res: Response, next: NextFunction) => User
  .find({})
  .then(
    (users) => res.send(getUsersBody(users)),
  )
  .catch(() => next(new ServerError()));

export const getUser = (req: Request, res: Response, next: NextFunction) => User
  .findById(req.params.id)
  .then(
    (user) => {
      if (!user) {
        throw new NotFoundError(NotFoundError.getMessage('user', req.params.id));
      }
      res.send(getUserBody(user));
    },
  )
  .catch((err) => {
    if (err.name === 'CastError') {
      next(new ClientError(`We couldn't parse id: ${req.params.id}`));
    } else {
      next(err);
    }
  });

export const updateUser = (req: IRequest, res: Response, next: NextFunction) => {
  const {
    name,
    about,
  } = req.body;

  return User
    .findByIdAndUpdate(
      req.user?._id,
      {
        name,
        about,
      },
      {
        new: true,
        runValidators: true,
        upsert: false,
      },
    )
    .then(
      (user) => {
        if (!user) {
          throw new NotFoundError(NotFoundError.getMessage('user', req.params.id));
        }
        res.send(getUserBody(user));
      },
    )
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new ClientError('Your data is not correct'));
      } else if (err.name === 'CastError') {
        next(new ClientError(`We couldn't parse id: ${req.params.id}`));
      } else {
        next(err);
      }
    });
};

export const updateUserAvatar = (req: IRequest, res: Response, next: NextFunction) => {
  const {
    avatar,
  } = req.body;

  return User
    .findByIdAndUpdate(
      req.user?._id,
      { avatar },
      {
        new: true,
        runValidators: true,
        upsert: false,
      },
    )
    .then(
      (user) => {
        if (!user) {
          throw new NotFoundError(NotFoundError.getMessage('user', req.params.id));
        }
        res.send(getUserBody(user));
      },
    )
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new ClientError('Your data is not correct'));
      } else if (err.name === 'CastError') {
        next(new ClientError(`We couldn't parse id: ${req.params.id}`));
      } else {
        next(err);
      }
    });
};
