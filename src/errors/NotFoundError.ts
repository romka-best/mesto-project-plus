import { Errors, IError } from './types';

export default class NotFoundError extends Error implements IError {
  statusCode = Errors.NotFound;

  static getMessage(entity: string, id: string) {
    return `${entity} not found with id: ${id}`;
  }
}
