import { NextFunction, Request, Response } from 'express';

const asyncHandler = (method: Function) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await method(req, res);
    } catch (error) {
      next(error);
    }
  };
};

export default asyncHandler;
