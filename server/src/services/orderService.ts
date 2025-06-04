import prisma from '../config/prismaClient';
import { OrderStatus } from '@prisma/client';
import CountryService from './countryService';
import CityService from './cityService';

class OrderService {
  static async createOrder(
    firstName: string,
    lastName: string,
    email: string,
    phone: string,
    countryId: string,
    cityId: string,
    street: string,
    postcode: string,
    userId: string
  ) {
    return await prisma.$transaction(async (tx) => {
      const country = await CountryService.getCountryNameById(countryId);
      const city = await CityService.getCityNameById(cityId);

      const customer = `${firstName} ${lastName}`;
      const address = `${country?.name}, ${city?.name}, ${street}, ${postcode}`;
      const contactInfo = `${email}, ${phone}`;

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
          contactInfo,
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

  static async getProductsByOrderId(orderId: string) {
    const orderProducts = await prisma.orderProduct.findMany({
      where: { orderId },
      select: { id: true, product: true, quantity: true },
    });
    return orderProducts;
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
