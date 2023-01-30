import { Router } from 'express';

import {
  createCard,
  getCards,
  likeCard,
  dislikeCard,
  deleteCard,
} from '../controllers/cards';

const router = Router();

router.post('/cards', createCard);
router.get('/cards', getCards);
router.put('/cards/:cardId/likes', likeCard);
router.delete('/cards/:cardId/likes', dislikeCard);
router.delete('/cards/:id', deleteCard);

export default router;
