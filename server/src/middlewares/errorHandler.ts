import { NextFunction, Request, Response } from 'express';
import { ZodError } from 'zod';

import ApiError from '../error/ApiError';
import ErrorMessage from '../error/errorMessage';

const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err instanceof ApiError) {
    res.status(err.statusCode).json({ message: err.message });
  } else if (err instanceof ZodError) {
    // console.log(err);
    res.status(400).json({ message: ErrorMessage.BAD_REQUEST });
  } else {
    res.status(500).json({ message: ErrorMessage.INTERNAL });
  }
};

export default errorHandler;
