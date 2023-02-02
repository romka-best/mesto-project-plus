import { Joi } from 'celebrate';
import { isValidObjectId } from 'mongoose';

import ClientError from '../../errors/ClientError';

export const ID_VALIDATION = Joi
  .string()
  .required()
  .alphanum()
  .length(24)
  .custom((value) => {
    if (isValidObjectId(value)) {
      return value;
    }
    return new ClientError('ID is not correct');
  }, 'Id validation');
export const EMAIL_VALIDATION = Joi
  .string()
  .email()
  .messages({
    'any.required': 'Email is required',
    'string.empty': 'Email is empty',
  });
export const PASSWORD_VALIDATION = Joi
  .string()
  .messages({
    'any.required': 'Password is required',
    'string.empty': 'Password is empty',
  });
export const NAME_VALIDATION = Joi
  .string()
  .min(2)
  .max(30)
  .messages({
    'any.required': 'Name is required',
    'string.min': 'Name must be more than 2 symbols',
    'string.max': 'Name must be less than 30 symbols',
    'string.empty': 'Name is empty',
  });
export const ABOUT_VALIDATION = Joi
  .string()
  .min(2)
  .max(30)
  .messages({
    'any.required': 'About is required',
    'string.min': 'About must be more than 2 symbols',
    'string.max': 'About must be less than 30 symbols',
    'string.empty': 'About не может быть пустым',
  });
export const AVATAR_VALIDATION = Joi
  .string()
  .pattern(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)/)
  .messages({
    'any.required': 'Avatar is required',
    'string.empty': 'Avatar is empty',
    'string.pattern.base': 'Incorrect link',
  });
export const LINK_VALIDATION = Joi
  .string()
  .pattern(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)/)
  .messages({
    'any.required': 'Link is required',
    'string.empty': 'Link is empty',
    'string.pattern.base': 'Incorrect link',
  });
