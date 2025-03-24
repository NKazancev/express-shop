import { Request, Response, NextFunction } from 'express';

import { Role } from '@prisma/client';
import ApiError from '../error/ApiError';
import ErrorMessage from '../error/errorMessage';

async function verifyAdmin(req: Request, res: Response, next: NextFunction) {
  if (req.user.role === Role.ADMIN) {
    next();
  } else {
    next(new ApiError(403, ErrorMessage.FORBIDDEN));
  }
}

export default verifyAdmin;
