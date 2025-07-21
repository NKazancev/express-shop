import { Router } from 'express';

import ProductController from '../../controllers/productController';
import asyncHandler from '../../middlewares/asyncHandler';
import verifyToken from '../../middlewares/verifyToken';
import verifyAdmin from '../../middlewares/verifyAdmin';
import upload from '../../middlewares/multerUpload';

const productRouter = Router();

const { 
  createProduct, 
  getProducts, 
  getProductById, 
  updateProductInfo, 
  updateProductGallery,
  deleteProduct 
} =  ProductController;

const uploadImages = upload.fields([{name: 'image'}, {name: 'images'}])

productRouter.post('/', [verifyToken, verifyAdmin], uploadImages, asyncHandler(createProduct));
productRouter.get('/', asyncHandler(getProducts));
productRouter.get('/:id', asyncHandler(getProductById));
productRouter.put('/:id', [verifyToken, verifyAdmin], asyncHandler(updateProductInfo));
productRouter.post('/gallery', [verifyToken, verifyAdmin], uploadImages, asyncHandler(updateProductGallery));
productRouter.delete('/:id', [verifyToken, verifyAdmin], asyncHandler(deleteProduct));

export default productRouter;
