import { Errors, IError } from './types';

export default class AuthRequiredError extends Error implements IError {
  statusCode = Errors.AuthRequiredError;

  constructor(message?: string) {
    super(message || 'AUTH REQUIRED ERROR');
  }
}
