import { Router } from 'express';

import UserController from '../../controllers/userController';
import asyncHandler from '../../middlewares/asyncHandler';
import verifyToken from '../../middlewares/verifyToken';

const userRouter = Router();

const { createUser, getUserCart, getUserInfo, changePassword, changeUsername } =
  UserController;

userRouter.post('/registration', asyncHandler(createUser));
userRouter.get('/cart', [verifyToken], asyncHandler(getUserCart));
userRouter.get('/info', [verifyToken], asyncHandler(getUserInfo));
userRouter.put('/password', [verifyToken], asyncHandler(changePassword));
userRouter.put('/username', [verifyToken], asyncHandler(changeUsername));

export default userRouter;
