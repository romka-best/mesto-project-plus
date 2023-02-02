import { Router } from 'express';

import {
  getUsers,
  getUser,
  getCurrentUser,
  updateUser,
  updateUserAvatar,
} from '../controllers/users';

import {
  getUserValidation,
  updateUserValidation,
  updateUserAvatarValidation,
} from '../utils/validation';

const router = Router();

router.get('/users', getUsers);
router.get('/users/me', getCurrentUser);
router.get('/users/:id', getUserValidation, getUser);
router.patch('/users/me', updateUserValidation, updateUser);
router.patch('/users/me/avatar', updateUserAvatarValidation, updateUserAvatar);

export default router;
