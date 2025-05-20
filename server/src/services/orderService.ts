import prisma from '../config/prismaClient';
import { OrderStatus } from '@prisma/client';

class OrderService {
  static async createOrder(customer: string, address: string, userId: string) {
    return await prisma.$transaction(async (tx) => {
      const cartProducts = await tx.cartProduct.findMany({
        where: { userId },
        include: { product: true },
      });

      const netAmount = cartProducts.reduce((acc, el) => {
        acc += el.quantity * el.product.price;
        return acc;
      }, 0);

      const order = await tx.order.create({
        data: {
          customer,
          address,
          netAmount,
          userId,
          products: {
            create: cartProducts.map((product) => {
              return {
                productId: product.productId,
                quantity: product.quantity,
              };
            }),
          },
        },
      });
      return order;
    });
  }

  static async getAllOrders() {
    const orders = await prisma.order.findMany();
    return orders;
  }

  static async updateOrderStatus(orderId: string, status: OrderStatus) {
    const order = await prisma.order.update({
      where: { id: orderId },
      data: { status },
    });
    return order;
  }
}

export default OrderService;
