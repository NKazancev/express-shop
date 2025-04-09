import { Router } from 'express';

import BrandController from '../../controllers/brandController';
import verifyToken from '../../middlewares/verifyToken';
import verifyAdmin from '../../middlewares/verifyAdmin';
import asyncHandler from '../../middlewares/asyncHandler';

const brandRouter = Router();

const { createBrand, getAllBrands, deleteBrand } = BrandController;

brandRouter.post('/', [verifyToken, verifyAdmin], asyncHandler(createBrand));
brandRouter.get('/', asyncHandler(getAllBrands));
brandRouter.delete('/:id', [verifyToken, verifyAdmin], asyncHandler(deleteBrand));

export default brandRouter;
