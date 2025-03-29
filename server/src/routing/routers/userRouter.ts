import { Router } from 'express';

import UserController from '../../controllers/userController';
import asyncHandler from '../../middlewares/asyncHandler';

const userRouter = Router();

const { createUser } = UserController;

userRouter.post('/registration', asyncHandler(createUser));

export default userRouter;
