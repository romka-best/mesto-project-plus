export interface IError {
  statusCode: number;
}

export enum Errors {
  'ClientError' = 400,
  'NotFound' = 404,
  'ServerError' = 500,
}
