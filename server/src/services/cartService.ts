import prisma from '../config/prismaClient';
import ApiError from '../error/ApiError';
import ErrorMessage from '../error/errorMessage';

class CartService {
  static async createCartProduct(
    quantity: number,
    productId: string,
    userId: string
  ) {
    const foundProduct = await prisma.product.findFirst({
      where: { id: productId },
    });
    if (!foundProduct) throw new ApiError(404, ErrorMessage.PRODUCT_NOT_FOUND);

    const foundCartProduct = await prisma.cartProduct.findFirst({
      where: { productId, userId },
    });
    if (!foundCartProduct) {
      return await prisma.cartProduct.create({
        data: { quantity, productId, userId },
      });
    } else {
      return await prisma.cartProduct.update({
        where: { id: foundCartProduct.id },
        data: { quantity: foundCartProduct.quantity + quantity },
      });
    }
  }

  static async getCartProducts(userId: string) {
    const cartProducts = await prisma.cartProduct.findMany({
      where: { userId },
      include: {
        product: { select: { image: true, name: true, price: true } },
      },
      omit: { userId: true, productId: true },
    });
    return cartProducts;
  }

  static async updateCartProduct(
    quantity: number,
    cartProductId: string,
    userId: string
  ) {
    const cartProduct = await prisma.cartProduct.findFirst({
      where: { id: cartProductId },
    });
    if (cartProduct?.userId !== userId) {
      throw new ApiError(403, ErrorMessage.FORBIDDEN);
    }
    await prisma.cartProduct.update({
      where: { id: cartProductId },
      data: { quantity },
    });
  }

  static async deleteCartProduct(cartProductId: string, userId: string) {
    const cartProduct = await prisma.cartProduct.findFirst({
      where: { id: cartProductId },
    });
    if (cartProduct?.userId !== userId) {
      throw new ApiError(403, ErrorMessage.FORBIDDEN);
    }
    await prisma.cartProduct.delete({ where: { id: cartProductId } });
  }
}

export default CartService;
