import { HydratedDocument } from 'mongoose';

import { ICard } from '../../models/card.types';

export default function getCardBody(
  card: HydratedDocument<unknown, any, ICard> & ICard,
): ICard & { _id: any } {
  return {
    _id: card._id,
    name: card.name,
    link: card.link,
    owner: card.owner,
    likes: card.likes,
    createdAt: card.createdAt,
  };
}
