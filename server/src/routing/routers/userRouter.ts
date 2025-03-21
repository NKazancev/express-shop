import { Router } from 'express';

import { login, logout, refresh, register } from '../../controllers/userController';

const userRouter = Router();

userRouter.post('/registration', register);
userRouter.post('/login', login);
userRouter.post('/logout', logout);
userRouter.get('/refresh', refresh);

export default userRouter;
