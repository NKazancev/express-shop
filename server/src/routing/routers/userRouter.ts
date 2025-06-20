import { Router } from 'express';

import UserController from '../../controllers/userController';
import asyncHandler from '../../middlewares/asyncHandler';
import verifyToken from '../../middlewares/verifyToken';

const userRouter = Router();

const { createUser, getUser, getUserInfo, changePassword, changeUsername } =
  UserController;

userRouter.post('/registration', asyncHandler(createUser));
userRouter.get('/', [verifyToken], asyncHandler(getUser));
userRouter.get('/info', [verifyToken], asyncHandler(getUserInfo));
userRouter.put('/password', [verifyToken], asyncHandler(changePassword));
userRouter.put('/username', [verifyToken], asyncHandler(changeUsername));

export default userRouter;
