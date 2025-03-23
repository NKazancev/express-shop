import { Product } from '@prisma/client';
import prisma from '../config/prismaClient';
import ApiError from '../error/ApiError';
import ErrorMessage from '../error/errorMessage';

class ProductService {
  async createProduct(data: Omit<Product, 'id'>) {
    const product = await prisma.product.create({ data: { ...data } });
    return product;
  }

  async getProducts(skip: number, take: number) {
    const products = await prisma.product.findMany({ skip, take });
    return products;
  }

  async getProductById(id: string) {
    const product = await prisma.product.findFirst({ where: { id } });
    if (!product) throw new ApiError(404, ErrorMessage.PRODUCT_NOT_FOUND);
    return product;
  }

  async updateProduct(id: string, data: Omit<Product, 'id'>) {
    const product = await prisma.product.update({ where: { id }, data: { ...data } }).catch(() => {
      throw new ApiError(404, ErrorMessage.PRODUCT_NOT_FOUND);
    });
    return product;
  }

  async deleteProduct(id: string) {
    await prisma.product.delete({ where: { id } }).catch(() => {
      throw new ApiError(404, ErrorMessage.PRODUCT_NOT_FOUND);
    });
  }
}

export default ProductService;
