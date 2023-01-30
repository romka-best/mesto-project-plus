import path from 'path';
import express from 'express';
import type { Response, NextFunction } from 'express';
import mongoose from 'mongoose';

import routerUsers from './routes/users';
import routerCards from './routes/cards';
import error from './middlewares/error';
import { IRequest } from './types';

const {
  PORT = 3000,
  BASE_PATH,
} = process.env;
const app = express();

mongoose.connect('mongodb://localhost:27017/mestodb');

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(express.static(path.join(__dirname, 'public')));

app.use((req: IRequest, res: Response, next: NextFunction) => {
  req.user = {
    _id: '63d70a63d810b3d8e0c5b550',
  };

  next();
});

app.use('/', routerUsers);
app.use('/', routerCards);

app.use(error);

app.listen(PORT, () => {
  console.log(`Ссылка на сервер: ${BASE_PATH}`);
});