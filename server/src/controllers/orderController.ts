import { Request, Response } from 'express';
import {
  CreateOrderSchema,
  UpdateOrderStatusSchema,
} from '../schema/orderSchema';
import OrderService from '../services/orderService';

class OrderController {
  static async createOrder(req: Request, res: Response) {
    CreateOrderSchema.parse(req.body);
    const { firstName, lastName } = req.body;
    const { country: countryId, city: cityId } = req.body;
    const { street, postcode, email, phone } = req.body;
    const userId = req.user.id;

    const order = await OrderService.createOrder(
      firstName,
      lastName,
      email,
      phone,
      countryId,
      cityId,
      street,
      postcode,
      userId
    );
    res.status(201).json(order);
  }

  static async getAllOrders(req: Request, res: Response) {
    const orders = await OrderService.getAllOrders();
    res.status(200).json(orders);
  }

  static async getOrderById(req: Request, res: Response) {
    const orderId = req.params.id;
    const order = await OrderService.getOrderById(orderId);
    res.status(200).json(order);
  }

  static async updateOrderStatus(req: Request, res: Response) {
    UpdateOrderStatusSchema.parse(req.body);
    const orderId = req.params.id;
    const { status } = req.body;
    const updatedOrder = await OrderService.updateOrderStatus(orderId, status);
    res.status(200).json(updatedOrder);
  }
}

export default OrderController;
