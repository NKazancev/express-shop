import { Product } from '@prisma/client';
import prisma from '../config/prismaClient';
import ApiError from '../error/ApiError';
import ErrorMessage from '../error/errorMessage';

class ProductService {
  static async createProduct(
    data: Omit<Product, 'id'>,
    image: string,
    images: string[],
    info: string
  ) {
    const foundProduct = await prisma.product.findFirst({
      where: { name: data.name },
    });
    if (foundProduct) throw new ApiError(409, ErrorMessage.PRODUCT_EXISTS);
    const product = await prisma.product.create({
      data: {
        ...data,
        image,
        gallery: { create: { images } },
        info: { create: { text: info } },
      },
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
        where: {
          name: { contains: searchQuery, mode: 'insensitive' },
        },
        skip,
        take,
      });
    } else {
      if (brandFilters) {
        products = await prisma.product.findMany({
          where: {
            typeId: productType,
            AND: [{ price: { gte: minPrice } }, { price: { lte: maxPrice } }],
            brandId: { in: brandFilters.split(',') },
          },
          skip,
          take,
        });
      }
      if (!brandFilters) {
        products = await prisma.product.findMany({
          where: {
            typeId: productType,
            AND: [{ price: { gte: minPrice } }, { price: { lte: maxPrice } }],
          },
          skip,
          take,
        });
      }
    }
    return products;
  }

  static async getProductById(id: string) {
    const product = await prisma.product.findFirst({
      where: { id },
      include: { gallery: true, info: true },
    });
    if (!product) throw new ApiError(404, ErrorMessage.PRODUCT_NOT_FOUND);
    return {
      ...product,
      gallery: product.gallery?.images,
      info: product.info?.text,
    };
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
