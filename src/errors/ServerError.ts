import { Errors, IError } from './types';

export default class ServerError extends Error implements IError {
  statusCode = Errors.ServerError;

  constructor(message?: string) {
    super(message || 'SERVER ERROR');
  }
}
