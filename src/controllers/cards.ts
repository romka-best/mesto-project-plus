import type { Request, Response, NextFunction } from 'express';
import { Schema } from 'mongoose';

import ClientError from '../errors/ClientError';
import NotFoundError from '../errors/NotFoundError';
import ServerError from '../errors/ServerError';

import Card from '../models/card';

import getCardBody from '../helpers/cards/getCardBody';
import getCardsBody from '../helpers/cards/getCardsBody';

import { IRequest } from '../types';

export const createCard = (req: Request, res: Response, next: NextFunction) => {
  const {
    name,
    link,
  } = req.body;

  return Card
    .create({
      name,
      link,
    })
    .then((card) => res.send(getCardBody(card)))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new ClientError('Переданы некорректные данные при создании карточки'));
      } else {
        next(err);
      }
    });
};

export const getCards = (req: Request, res: Response, next: NextFunction) => Card
  .find({})
  .then(
    (cards) => res.send(getCardsBody(cards)),
  )
  .catch(() => next(new ServerError()));

export const deleteCard = (req: Request, res: Response, next: NextFunction) => Card
  .findByIdAndRemove(req.params.id)
  .then(
    (card) => {
      if (!card) {
        throw new NotFoundError(NotFoundError.getMessage('card', req.params.id));
      }
      res.send(getCardBody(card));
    },
  )
  .catch((err) => {
    if (err.name === 'CastError') {
      next(new ClientError(`We couldn't parse id: ${req.params.id}`));
    } else {
      next(err);
    }
  });

export const likeCard = (req: IRequest, res: Response, next: NextFunction) => Card
  .findByIdAndUpdate(
    req.params.cardId,
    {
      $addToSet: { likes: new Schema.Types.ObjectId(req.user?._id as string) },
    },
    {
      new: true,
      runValidators: true,
      upsert: false,
    },
  )
  .then(
    (card) => {
      if (!card) {
        throw new NotFoundError(NotFoundError.getMessage('card', req.params.id));
      }
      res.send(getCardBody(card));
    },
  )
  .catch((err) => {
    if (err.name === 'CastError') {
      next(new ClientError(`We couldn't parse id: ${req.params.id}`));
    } else {
      next(err);
    }
  });

export const dislikeCard = (req: IRequest, res: Response, next: NextFunction) => Card
  .findByIdAndUpdate(
    req.params.cardId,
    {
      $pull: { likes: new Schema.Types.ObjectId(req.user?._id as string) },
    },
    {
      new: true,
      runValidators: true,
      upsert: false,
    },
  )
  .then(
    (card) => {
      if (!card) {
        throw new NotFoundError(NotFoundError.getMessage('card', req.params.id));
      }
      res.send(getCardBody(card));
    },
  )
  .catch((err) => {
    if (err.name === 'CastError') {
      next(new ClientError(`We couldn't parse id: ${req.params.id}`));
    } else {
      next(err);
    }
  });
