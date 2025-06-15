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
    const orders = await prisma.order.findMany({
      orderBy: { createdAt: 'asc' },
    });
    return orders;
  }

  static async getAllUserOrders(userId: string) {
    const orders = await prisma.order.findMany({
      where: { userId },
      orderBy: { createdAt: 'asc' },
      include: {
        products: {
          select: {
            quantity: true,
            product: {
              select: { id: true, image: true, name: true },
            },
          },
        },
      },
    });
    const userOrders = orders.map((order) => {
      return {
        ...order,
        products: order.products.map((el) => {
          return {
            id: el.product.id,
            quantity: el.quantity,
            name: el.product.name,
            image: el.product.image,
          };
        }),
      };
    });
    return userOrders;
  }

  static async getOrderById(orderId: string) {
    const order = await prisma.order.findFirst({
      where: { id: orderId },
      include: {
        products: {
          select: {
            quantity: true,
            product: { select: { id: true, name: true, image: true } },
          },
        },
      },
    });
    const orderProducts = order?.products.map((el) => ({
      id: el.product.id,
      quantity: el.quantity,
      name: el.product.name,
      image: el.product.image,
    }));
    return { ...order, products: orderProducts };
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
