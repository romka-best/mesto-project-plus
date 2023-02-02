import { HydratedDocument } from 'mongoose';

import { ICard } from '../../models/card.types';

import { ICardBody } from './types';

export default function getCardsBody(
  cards: Array<HydratedDocument<unknown, any, ICard> & ICard>,
): Array<ICardBody> {
  const cardsBody: Array<ICardBody> = [];

  cards.forEach((card) => {
    cardsBody.push({
      _id: card._id,
      name: card.name,
      link: card.link,
      owner: card.owner,
      likes: card.likes,
      createdAt: card.createdAt,
    });
  });

  return cardsBody;
}
