import { Errors, IError } from './types';

export default class ConflictError extends Error implements IError {
  statusCode = Errors.ConflictError;

  constructor(message?: string) {
    super(message || 'CONFLICT ERROR');
  }
}
