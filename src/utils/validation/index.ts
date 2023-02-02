import { celebrate, Joi, Segments } from 'celebrate';

import {
  ABOUT_VALIDATION,
  AVATAR_VALIDATION,
  EMAIL_VALIDATION,
  ID_VALIDATION,
  LINK_VALIDATION,
  NAME_VALIDATION,
  PASSWORD_VALIDATION,
} from './constants';

// Users
export const commonUserValidation = celebrate({
  [Segments.PARAMS]: Joi
    .object()
    .keys({
      id: ID_VALIDATION,
    }),
});
export const signInValidation = celebrate({
  [Segments.BODY]: Joi
    .object()
    .keys({
      email: EMAIL_VALIDATION,
      password: PASSWORD_VALIDATION,
    }),
});

export const signUpValidation = celebrate({
  [Segments.BODY]: Joi
    .object()
    .keys({
      email: EMAIL_VALIDATION,
      password: PASSWORD_VALIDATION,
      name: NAME_VALIDATION,
      about: ABOUT_VALIDATION,
      avatar: AVATAR_VALIDATION,
    }),
});

export const getUserValidation = commonUserValidation;

export const updateUserValidation = celebrate({
  [Segments.BODY]: Joi
    .object()
    .keys({
      name: NAME_VALIDATION,
      about: ABOUT_VALIDATION,
    }),
});

export const updateUserAvatarValidation = celebrate({
  [Segments.BODY]: Joi
    .object()
    .keys({
      avatar: AVATAR_VALIDATION.required(),
    }),
});

// Cards
export const commonCardValidation = celebrate({
  [Segments.PARAMS]: Joi
    .object()
    .keys({
      id: ID_VALIDATION,
    }),
});
export const createCardValidation = celebrate({
  [Segments.BODY]: Joi
    .object()
    .keys({
      name: NAME_VALIDATION,
      link: LINK_VALIDATION,
    }),
});
