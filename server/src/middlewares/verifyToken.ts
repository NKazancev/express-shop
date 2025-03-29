import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';

import { ACCESS_TOKEN_KEY } from '../config/envVariables';
import ApiError from '../error/ApiError';
import ErrorMessage from '../error/errorMessage';

const verifyToken = (req: Request, res: Response, next: NextFunction) => {
  const accessToken = req.headers.authorization?.split(' ')[1];

  if (!accessToken) {
    next(new ApiError(401, ErrorMessage.UNAUTHORIZED));
  } else {
    try {
      const tokenData = verify(accessToken, ACCESS_TOKEN_KEY) as {
        id: string;
        role: string;
      };
      req.user = { ...tokenData };
      next();
    } catch (error) {
      next(new ApiError(403, ErrorMessage.FORBIDDEN));
    }
  }
};

export default verifyToken;
