import { Router } from 'express';

import AuthController from '../../controllers/authController';
import asyncHandler from '../../middlewares/asyncHandler';

const authRouter = Router();

const { login, logout, refresh } = AuthController;

authRouter.post('/login', asyncHandler(login));
authRouter.post('/logout', asyncHandler(logout));
authRouter.get('/refresh', asyncHandler(refresh));

export default authRouter;
