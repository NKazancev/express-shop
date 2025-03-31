import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { join } from 'path';

import rootRouter from './routing/rootRouter';
import errorHandler from './middlewares/errorHandler';
import { PORT } from './config/envVariables';

const app = express();

app.use(cors({ origin: 'http://localhost:5173', credentials: true }));
app.use(cookieParser());
app.use(express.json());
app.use('/static', express.static(join(__dirname, 'static')));
app.use('/api', rootRouter);
app.use(errorHandler);

app.listen(PORT, () => console.log('Server OK'));
