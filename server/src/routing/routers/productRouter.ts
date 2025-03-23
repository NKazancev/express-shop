import { Router } from 'express';
import asyncHandler from '../../middlewares/asyncHandler';
import ProductController from '../../controllers/productController';

const productRouter = Router();

const { createProduct, getProducts, getProductById, updateProduct, deleteProduct } =
  new ProductController();

productRouter.post('/', asyncHandler(createProduct));
productRouter.get('/', asyncHandler(getProducts));
productRouter.get('/:id', asyncHandler(getProductById));
productRouter.put('/:id', asyncHandler(updateProduct));
productRouter.delete('/:id', asyncHandler(deleteProduct));

export default productRouter;
