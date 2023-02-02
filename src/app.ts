import express from 'express';
import mongoose from 'mongoose';
import { errors } from 'celebrate';

import { signIn, signUp } from './controllers/users';

import routerUsers from './routes/users';
import routerCards from './routes/cards';

import auth from './middlewares/auth';
import notFound from './middlewares/notFound';
import error from './middlewares/error';
import { requestLogger, errorLogger } from './middlewares/logger';

import { signInValidation, signUpValidation } from './utils/validation';

const {
  PORT = 3000,
  BASE_PATH = 'http://localhost',
} = process.env;
const app = express();

mongoose.connect('mongodb://localhost:27017/mestodb');

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(requestLogger);

app.post('/signin', signInValidation, signIn);
app.post('/signup', signUpValidation, signUp);

app.use(auth);
app.use('/', routerUsers);
app.use('/', routerCards);

app.use(notFound);
app.use(errorLogger);
app.use(errors());
app.use(error);

app.listen(PORT, () => {
  console.log(`Ссылка на сервер: ${BASE_PATH}:${PORT}`);
});
