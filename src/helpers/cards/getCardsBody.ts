import { HydratedDocument } from 'mongoose';

import { ICard } from '../../models/card.types';

export default function getCardsBody(
  cards: Array<HydratedDocument<unknown, any, ICard> & ICard>,
): Array<ICard & { _id: any }> {
  const cardsBody: Array<ICard & { _id: any }> = [];

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
