import { Router } from 'express';

import UserController from '../../controllers/userController';
import asyncHandler from '../../middlewares/asyncHandler';

const userRouter = Router();

const { register, login, logout, refresh } = new UserController();

userRouter.post('/registration', asyncHandler(register));
userRouter.post('/login', asyncHandler(login));
userRouter.post('/logout', asyncHandler(logout));
userRouter.get('/refresh', asyncHandler(refresh));

export default userRouter;
