import { Router } from 'express';

import ProductController from '../../controllers/productController';
import asyncHandler from '../../middlewares/asyncHandler';
import verifyToken from '../../middlewares/verifyToken';
import verifyAdmin from '../../middlewares/verifyAdmin';
import upload from '../../middlewares/multerUpload';

const productRouter = Router();

const { createProduct, getProducts, getProductById, updateProduct, deleteProduct } =
  ProductController;

const uploadImages = upload.fields([{name: 'image'}, {name: 'gallery'}])

productRouter.post('/', [verifyToken, verifyAdmin], uploadImages, asyncHandler(createProduct));
productRouter.get('/', asyncHandler(getProducts));
productRouter.get('/:id', asyncHandler(getProductById));
productRouter.put('/:id', [verifyToken, verifyAdmin], asyncHandler(updateProduct));
productRouter.delete('/:id', [verifyToken, verifyAdmin], asyncHandler(deleteProduct));

export default productRouter;
