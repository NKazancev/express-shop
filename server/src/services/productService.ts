import { Product } from '@prisma/client';
import prisma from '../config/prismaClient';
import ApiError from '../error/ApiError';
import ErrorMessage from '../error/errorMessage';

class ProductService {
  static async createProduct(data: Omit<Product, 'id'>, file: string) {
    const foundProduct = await prisma.product.findFirst({
      where: { name: data.name },
    });
    if (foundProduct) throw new ApiError(409, ErrorMessage.PRODUCT_EXISTS);
    const product = await prisma.product.create({
      data: { ...data, image: file },
    });
    return product;
  }

  static async getProducts(searchQuery: string, skip: number, take: number) {
    let products;
    if (!searchQuery) {
      products = await prisma.product.findMany({ skip, take });
    } else {
      products = await prisma.product.findMany({
        where: { name: { contains: searchQuery, mode: 'insensitive' } },
        skip,
        take,
      });
    }
    return products;
  }

  static async getProductById(id: string) {
    const product = await prisma.product.findFirst({ where: { id } });
    if (!product) throw new ApiError(404, ErrorMessage.PRODUCT_NOT_FOUND);
    return product;
  }

  static async updateProduct(id: string, data: Omit<Product, 'id'>) {
    const product = await prisma.product
      .update({ where: { id }, data: { ...data } })
      .catch(() => {
        throw new ApiError(404, ErrorMessage.PRODUCT_NOT_FOUND);
      });
    return product;
  }

  static async deleteProduct(id: string) {
    await prisma.product.delete({ where: { id } }).catch(() => {
      throw new ApiError(404, ErrorMessage.PRODUCT_NOT_FOUND);
    });
  }
}

export default ProductService;
