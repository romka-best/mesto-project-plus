import { Router } from 'express';

import {
  getUsers,
  getUser,
  createUser,
  updateUser,
  updateUserAvatar,
} from '../controllers/users';

const router = Router();

router.post('/users', createUser);
router.get('/users', getUsers);
router.get('/users/:id', getUser);
router.patch('/users/me', updateUser);
router.patch('/users/me/avatar', updateUserAvatar);

export default router;
