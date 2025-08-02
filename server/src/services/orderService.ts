import prisma from '../config/prismaClient';
import { OrderStatus } from '@prisma/client';
import AddressService from './addressService';

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
      const customer = `${firstName} ${lastName}`;
      const contactInfo = `${email}, ${phone}`;
      const address = await AddressService.createStringAddress(
        countryId,
        cityId,
        street,
        postcode
      );

      const cartProducts = await tx.cartProduct.findMany({
        where: { userId },
        include: { product: true },
      });
      const netAmount = cartProducts.reduce((acc, el) => {
        acc += el.quantity * el.product.price;
        return acc;
      }, 0);

      await tx.cartProduct.deleteMany({ where: { userId } });
      await tx.order.create({
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
    });
  }

  static async getAllOrders(skip: number, take: number) {
    const [orders, ordersQuantity] = await prisma.$transaction([
      prisma.order.findMany({
        orderBy: { createdAt: 'desc' },
        omit: { userId: true },
        skip,
        take,
      }),
      prisma.order.count(),
    ]);
    return { orders, quantity: ordersQuantity };
  }

  static async getAllUserOrders(userId: string, skip: number, take: number) {
    return await prisma.$transaction(async (tx) => {
      const data = await tx.order.findMany({
        where: { userId },
        orderBy: { createdAt: 'desc' },
        include: {
          products: {
            select: {
              quantity: true,
              product: { select: { id: true, image: true, name: true } },
            },
          },
        },
        omit: { userId: true, customer: true },
        skip,
        take,
      });

      const orders = data.map((order) => {
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
      const ordersQuantity = await tx.order.count({ where: { userId } });
      return { orders, quantity: ordersQuantity };
    });
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
      omit: { userId: true },
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
    return await prisma.order.update({
      where: { id: orderId },
      data: { status },
    });
  }
}

export default OrderService;
