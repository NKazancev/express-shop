import { Router } from 'express';

import CartController from '../../controllers/cartController';
import verifyToken from '../../middlewares/verifyToken';
import asyncHandler from '../../middlewares/asyncHandler';

const cartRouter = Router();

const {
  createCartProduct,
  getCartProducts,
  updateCartProduct,
  deleteCartProduct,
} = CartController;

cartRouter.post('/', [verifyToken], asyncHandler(createCartProduct));
cartRouter.get('/', [verifyToken], asyncHandler(getCartProducts));
cartRouter.put('/:id', [verifyToken], asyncHandler(updateCartProduct));
cartRouter.delete('/:id', [verifyToken], asyncHandler(deleteCartProduct));

export default cartRouter;
