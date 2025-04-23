import { Router } from 'express';

import authRouter from './routers/authRouter';
import userRouter from './routers/userRouter';
import productRouter from './routers/productRouter';
import typeRouter from './routers/typeRouter';
import brandRouter from './routers/brandRouter';
import cartRouter from './routers/cartRouter';

const rootRouter = Router();

rootRouter.use('/auth', authRouter);
rootRouter.use('/users', userRouter);
rootRouter.use('/products', productRouter);
rootRouter.use('/types', typeRouter);
rootRouter.use('/brands', brandRouter);
rootRouter.use('/cart', cartRouter);

export default rootRouter;
