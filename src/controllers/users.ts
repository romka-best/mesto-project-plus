import type { Request, Response, NextFunction } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

import ClientError from '../errors/ClientError';
import NotFoundError from '../errors/NotFoundError';
import ConflictError from '../errors/ConflictError';
import ServerError from '../errors/ServerError';

import User from '../models/user';

import getUserBody from '../helpers/users/getUserBody';
import getUsersBody from '../helpers/users/getUsersBody';

import { IRequest } from '../types';

export const signIn = (req: Request, res: Response, next: NextFunction) => {
  const {
    email,
    password,
  } = req.body;

  return User
    .findUserByCredentials(email, password)
    .then((user) => {
      res.send({
        token: jwt.sign({ _id: user._id }, 'super-strong-secret', { expiresIn: '7d' }),
      });
    })
    .catch(next);
};

export const signUp = (req: Request, res: Response, next: NextFunction) => {
  const {
    email,
    password,
    name,
    about,
    avatar,
  } = req.body;

  return bcrypt
    .hash(password, 10)
    .then((hash) => User
      .create({
        email,
        password: hash,
        name,
        about,
        avatar,
      }))
    .then((user) => res.send(getUserBody(user)))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new ClientError('Your data is not correct'));
      } else if (err.code === 11000) {
        next(new ConflictError('Email is already exists'));
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

export const getCurrentUser = (req: IRequest, res: Response, next: NextFunction) => User
  .findById(req.user?._id)
  .then(
    (user) => {
      if (!user) {
        throw new NotFoundError('User not found');
      }
      res.send(getUserBody(user));
    },
  )
  .catch((err) => {
    if (err.name === 'CastError') {
      next(new ClientError(`We couldn't parse id: ${req.user?._id}`));
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
          throw new NotFoundError('User not found');
        }
        res.send(getUserBody(user));
      },
    )
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new ClientError('Your data is not correct'));
      } else if (err.name === 'CastError') {
        next(new ClientError(`We couldn't parse id: ${req.user?._id}`));
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
          throw new NotFoundError('User not found');
        }
        res.send(getUserBody(user));
      },
    )
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new ClientError('Your data is not correct'));
      } else if (err.name === 'CastError') {
        next(new ClientError(`We couldn't parse id: ${req.user?._id}`));
      } else {
        next(err);
      }
    });
};
