import { Router } from 'express';

import userRouter from './routers/userRouter';
import productRouter from './routers/productRouter';

const rootRouter = Router();

rootRouter.use('/users', userRouter);
rootRouter.use('/products', productRouter);

export default rootRouter;
