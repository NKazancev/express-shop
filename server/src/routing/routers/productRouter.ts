import { Router } from 'express';

import ProductController from '../../controllers/productController';
import asyncHandler from '../../middlewares/asyncHandler';
import verifyToken from '../../middlewares/verifyToken';
import verifyAdmin from '../../middlewares/verifyAdmin';
import upload from '../../middlewares/multerUpload';

const productRouter = Router();

const { createProduct, getProducts, getProductById, updateProduct, deleteProduct } =
  ProductController;

productRouter.post('/', [verifyToken, verifyAdmin], upload.single('image'), asyncHandler(createProduct));
productRouter.get('/', asyncHandler(getProducts));
productRouter.get('/:id', asyncHandler(getProductById));
productRouter.put('/:id', [verifyToken, verifyAdmin], asyncHandler(updateProduct));
productRouter.delete('/:id', [verifyToken, verifyAdmin], asyncHandler(deleteProduct));

export default productRouter;
