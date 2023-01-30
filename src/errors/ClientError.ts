import { Errors, IError } from './types';

export default class ClientError extends Error implements IError {
  statusCode = Errors.ClientError;

  constructor(message?: string) {
    super(message || 'CLIENT ERROR');
  }
}
