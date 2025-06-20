import { Router } from 'express';

import authRouter from './routers/authRouter';
import userRouter from './routers/userRouter';
import productRouter from './routers/productRouter';
import typeRouter from './routers/typeRouter';
import brandRouter from './routers/brandRouter';
import cartRouter from './routers/cartRouter';
import reviewRouter from './routers/reviewRouter';
import countryRouter from './routers/countryRouter';
import cityRouter from './routers/cityRouter';
import orderRouter from './routers/orderRouter';
import addressRouter from './routers/addressRouter';

const rootRouter = Router();

rootRouter.use('/auth', authRouter);
rootRouter.use('/users', userRouter);
rootRouter.use('/products', productRouter);
rootRouter.use('/types', typeRouter);
rootRouter.use('/brands', brandRouter);
rootRouter.use('/cart', cartRouter);
rootRouter.use('/reviews', reviewRouter);
rootRouter.use('/countries', countryRouter);
rootRouter.use('/cities', cityRouter);
rootRouter.use('/orders', orderRouter);
rootRouter.use('/addresses', addressRouter);

export default rootRouter;
