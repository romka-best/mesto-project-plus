export interface IError {
  statusCode: number;
}

export enum Errors {
  'ClientError' = 400,
  'AuthRequiredError' = 401,
  'ForbiddenError' = 403,
  'NotFound' = 404,
  'ConflictError' = 409,
  'ServerError' = 500,
}
