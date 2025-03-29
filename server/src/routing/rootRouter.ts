import { Router } from 'express';

import authRouter from './routers/authRouter';
import userRouter from './routers/userRouter';
import productRouter from './routers/productRouter';

const rootRouter = Router();

rootRouter.use('/auth', authRouter);
rootRouter.use('/users', userRouter);
rootRouter.use('/products', productRouter);

export default rootRouter;
