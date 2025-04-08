import { Router } from 'express';

import ProductTypeController from '../../controllers/productTypeController';
import verifyToken from '../../middlewares/verifyToken';
import verifyAdmin from '../../middlewares/verifyAdmin';
import asyncHandler from '../../middlewares/asyncHandler';

const typeRouter = Router();

const { createType, getAllTypes, updateType, deleteType } =
  ProductTypeController;

typeRouter.post('/', [verifyToken, verifyAdmin], asyncHandler(createType));
typeRouter.get('/', asyncHandler(getAllTypes));
typeRouter.put('/:id', [verifyToken, verifyAdmin], asyncHandler(updateType));
typeRouter.delete('/:id', [verifyToken, verifyAdmin], asyncHandler(deleteType));

export default typeRouter;
