import { Errors, IError } from './types';

export default class ForbiddenError extends Error implements IError {
  statusCode = Errors.ForbiddenError;

  constructor(message?: string) {
    super(message || 'FORBIDDEN ERROR');
  }
}
