import { Router } from 'express';

import verifyToken from '../../middlewares/verifyToken';
import verifyAdmin from '../../middlewares/verifyAdmin';
import asyncHandler from '../../middlewares/asyncHandler';
import OrderController from '../../controllers/orderController';

const orderRouter = Router();

const { createOrder, getAllOrders, getOrderById, updateOrderStatus } =
  OrderController;

orderRouter.post('/', [verifyToken], asyncHandler(createOrder));
orderRouter.get('/', [verifyToken, verifyAdmin], asyncHandler(getAllOrders));
orderRouter.get('/:id', [verifyToken, verifyAdmin], asyncHandler(getOrderById));
orderRouter.put('/:id', [verifyToken, verifyAdmin], asyncHandler(updateOrderStatus));

export default orderRouter;
