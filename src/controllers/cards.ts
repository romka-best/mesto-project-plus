import type { Request, Response, NextFunction } from 'express';

import ClientError from '../errors/ClientError';
import NotFoundError from '../errors/NotFoundError';
import ServerError from '../errors/ServerError';

import Card from '../models/card';

import getCardBody from '../helpers/cards/getCardBody';
import getCardsBody from '../helpers/cards/getCardsBody';

import { IRequest } from '../types';

export const createCard = (req: IRequest, res: Response, next: NextFunction) => {
  const {
    name,
    link,
  } = req.body;

  return Card
    .create({
      name,
      link,
      owner: req.user?._id,
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
      $addToSet: { likes: req.user?._id },
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
    { $pull: { likes: req.user?._id } },
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
