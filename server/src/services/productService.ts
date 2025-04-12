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

  static async getProducts(
    searchQuery: string,
    productType: string,
    brandFilters: string,
    minPrice: number,
    maxPrice: number,
    skip: number,
    take: number
  ) {
    let products;
    if (searchQuery) {
      products = await prisma.product.findMany({
        where: { name: { contains: searchQuery, mode: 'insensitive' } },
        skip,
        take,
      });
    }
    if (!searchQuery && productType === 'All' && !brandFilters) {
      products = await prisma.product.findMany({
        where: {
          AND: [{ price: { gte: minPrice } }, { price: { lte: maxPrice } }],
        },
        skip,
        take,
      });
    }
    if (!searchQuery && productType !== 'All' && brandFilters) {
      products = await prisma.product.findMany({
        where: {
          AND: [{ price: { gte: minPrice } }, { price: { lte: maxPrice } }],
          typeId: productType,
          brandId: { in: brandFilters.split(',') },
        },
        skip,
        take,
      });
    }
    if (!searchQuery && productType !== 'All' && !brandFilters) {
      products = await prisma.product.findMany({
        where: {
          AND: [{ price: { gte: minPrice } }, { price: { lte: maxPrice } }],
          typeId: productType,
        },
        skip,
        take,
      });
    }
    if (!searchQuery && productType === 'All' && brandFilters) {
      products = await prisma.product.findMany({
        where: {
          AND: [{ price: { gte: minPrice } }, { price: { lte: maxPrice } }],
          brandId: { in: brandFilters.split(',') },
        },
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
