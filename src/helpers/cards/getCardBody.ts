import { HydratedDocument } from 'mongoose';

import { ICard } from '../../models/card.types';

import { ICardBody } from './types';

export default function getCardBody(
  card: HydratedDocument<unknown, any, ICard> & ICard,
): ICardBody {
  return {
    _id: card._id,
    name: card.name,
    link: card.link,
    owner: card.owner,
    likes: card.likes,
    createdAt: card.createdAt,
  };
}
