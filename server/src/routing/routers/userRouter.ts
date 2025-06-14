import { Router } from 'express';

import UserController from '../../controllers/userController';
import asyncHandler from '../../middlewares/asyncHandler';
import verifyToken from '../../middlewares/verifyToken';

const userRouter = Router();

const { createUser, getUser, changePassword, changeUsername } = UserController;

userRouter.post('/registration', asyncHandler(createUser));
userRouter.get('/info', [verifyToken], asyncHandler(getUser));
userRouter.put('/password', [verifyToken], asyncHandler(changePassword));
userRouter.put('/username', [verifyToken], asyncHandler(changeUsername));

export default userRouter;
