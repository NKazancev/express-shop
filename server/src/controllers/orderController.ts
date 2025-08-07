import { Request, Response } from 'express';
import {
  CreateOrderSchema,
  UpdateOrderStatusSchema,
} from '../schema/orderSchema';
import OrderService from '../services/orderService';
import ResMessage from '../config/resMessage';

class OrderController {
  static async createOrder(req: Request, res: Response) {
    CreateOrderSchema.parse(req.body);
    const { firstName, lastName } = req.body;
    const { country: countryId, city: cityId } = req.body;
    const { street, postcode, email, phone } = req.body;
    const userId = req.user.id;

    await OrderService.createOrder(
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
    res.status(201).json({ message: ResMessage.SUCCESS });
  }

  static async getAllOrders(req: Request, res: Response) {
    const skip = Number(req.query.skip) || 0;
    const take = Number(req.query.take) || 4;
    const { orders, quantity } = await OrderService.getAllOrders(skip, take);
    res.status(200).json({ data: orders, quantity });
  }

  static async getAllUserOrders(req: Request, res: Response) {
    const skip = Number(req.query.skip) || 0;
    const take = Number(req.query.take) || 4;
    const userId = req.user.id;
    const { orders, quantity } = await OrderService.getAllUserOrders(
      userId,
      skip,
      take
    );
    res.status(200).json({ data: orders, quantity });
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
    await OrderService.updateOrderStatus(orderId, status);
    res.status(200).json({ message: ResMessage.SUCCESS });
  }

  static async deleteOrder(req: Request, res: Response) {
    const orderId = req.params.id;
    await OrderService.deleteOrder(orderId);
    res.status(204).json();
  }
}

export default OrderController;
