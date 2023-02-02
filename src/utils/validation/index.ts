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
      email: EMAIL_VALIDATION.required(),
      password: PASSWORD_VALIDATION.required(),
    }),
});

export const signUpValidation = celebrate({
  [Segments.BODY]: Joi
    .object()
    .keys({
      email: EMAIL_VALIDATION.required(),
      password: PASSWORD_VALIDATION.required(),
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
      name: NAME_VALIDATION.required(),
      about: ABOUT_VALIDATION.required(),
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
      name: NAME_VALIDATION.required(),
      link: LINK_VALIDATION.required(),
    }),
});
