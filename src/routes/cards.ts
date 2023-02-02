import { Router } from 'express';

import {
  createCard,
  getCards,
  likeCard,
  dislikeCard,
  deleteCard,
} from '../controllers/cards';

import {
  commonCardValidation,
  createCardValidation,
} from '../utils/validation';

const router = Router();

router.post('/cards', createCardValidation, createCard);
router.get('/cards', getCards);
router.put('/cards/:id/likes', commonCardValidation, likeCard);
router.delete('/cards/:id/likes', commonCardValidation, dislikeCard);
router.delete('/cards/:id', commonCardValidation, deleteCard);

export default router;
