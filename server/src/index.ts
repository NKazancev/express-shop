import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';

import rootRouter from './routing/rootRouter';
import errorHandler from './middlewares/errorHandler';
import { PORT } from './config/envVariables';

const app = express();

app.use(cors({ origin: 'http://localhost:5173', credentials: true }));
app.use(express.json());
app.use(cookieParser());
app.use('/api', rootRouter);
app.use(errorHandler);

app.listen(PORT, () => console.log('Server OK'));
