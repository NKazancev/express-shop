import { Router } from 'express';

import userRouter from './routers/userRouter';

const rootRouter = Router();

rootRouter.use('/users', userRouter);

export default rootRouter;
