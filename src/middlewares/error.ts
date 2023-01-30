import type {
  Request,
  Response,
  ErrorRequestHandler,
  NextFunction,
} from 'express';

interface IError {
  statusCode?: number;
  message?: string;
}

const error: ErrorRequestHandler = (
  err: IError,
  req: Request,
  res: Response,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  next: NextFunction,
) => {
  const {
    statusCode = 500,
    message,
  } = err;

  res
    .status(statusCode)
    .send({
      message: statusCode === 500
        ? 'SERVER ERROR'
        : message,
    });
};

export default error;
