import { Router } from 'express';

import TypeController from '../../controllers/typeController';
import verifyToken from '../../middlewares/verifyToken';
import verifyAdmin from '../../middlewares/verifyAdmin';
import asyncHandler from '../../middlewares/asyncHandler';

const typeRouter = Router();

const { createType, getAllTypes, deleteType } = TypeController;

typeRouter.post('/', [verifyToken, verifyAdmin], asyncHandler(createType));
typeRouter.get('/', asyncHandler(getAllTypes));
typeRouter.delete('/:id', [verifyToken, verifyAdmin], asyncHandler(deleteType));

export default typeRouter;
