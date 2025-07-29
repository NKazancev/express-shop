import { Product } from '@prisma/client';
import prisma from '../config/prismaClient';
import ApiError from '../error/ApiError';
import ErrorMessage from '../error/errorMessage';

class ProductService {
  static async createProduct(
    productData: Omit<Product, 'id'>,
    image: string,
    images: string[],
    text: string
  ) {
    const foundProduct = await prisma.product.findFirst({
      where: {
        name: { equals: productData.name, mode: 'insensitive' },
      },
    });
    if (foundProduct) throw new ApiError(409, ErrorMessage.PRODUCT_EXISTS);

    return await prisma.product.create({
      data: {
        ...productData,
        image,
        gallery: { create: { images } },
        info: { create: { text } },
      },
    });
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
    if (searchQuery) {
      const [products, productsQuantity] = await prisma.$transaction([
        prisma.product.findMany({
          where: {
            name: { contains: searchQuery, mode: 'insensitive' },
          },
          omit: { brandId: true, typeId: true },
          skip,
          take,
        }),
        prisma.product.count({
          where: {
            name: { contains: searchQuery, mode: 'insensitive' },
          },
        }),
      ]);
      return { products, quantity: productsQuantity };
    } else {
      const [products, productsQuantity] = await prisma.$transaction([
        prisma.product.findMany({
          where: {
            typeId: productType || undefined,
            brandId: brandFilters ? { in: brandFilters.split(',') } : undefined,
            AND: [{ price: { gte: minPrice } }, { price: { lte: maxPrice } }],
          },
          omit: { brandId: true, typeId: true },
          skip,
          take,
        }),
        prisma.product.count({
          where: {
            typeId: productType || undefined,
            brandId: brandFilters ? { in: brandFilters.split(',') } : undefined,
            AND: [{ price: { gte: minPrice } }, { price: { lte: maxPrice } }],
          },
        }),
      ]);
      return { products, quantity: productsQuantity };
    }
  }

  static async getProductById(id: string) {
    const product = await prisma.product.findFirst({
      where: { id },
      include: {
        gallery: { select: { images: true } },
        info: { select: { text: true } },
        reviews: {
          include: { user: { select: { username: true } } },
          omit: { userId: true },
        },
      },
      omit: { typeId: true, brandId: true, image: true, description: true },
    });
    if (!product) throw new ApiError(404, ErrorMessage.PRODUCT_NOT_FOUND);
    return product;
  }

  static async updateProductInfo(
    productId: string,
    data: Pick<Product, 'name' | 'description' | 'price'>,
    text: string,
    stock: number
  ) {
    if (data) {
      const sourceProduct = await prisma.product.findFirst({
        where: { id: productId },
      });
      const foundProduct = await prisma.product.findFirst({
        where: { name: data.name },
      });
      if (
        sourceProduct?.name !== data?.name &&
        data.name === foundProduct?.name
      ) {
        throw new ApiError(409, ErrorMessage.PRODUCT_EXISTS);
      }
      return await prisma.product.update({
        where: { id: productId },
        data: {
          name: data.name,
          description: data.description,
          price: data.price,
          stock,
          info: { update: { where: { productId }, data: { text } } },
        },
      });
    } else {
      return await prisma.product.update({
        where: { id: productId },
        data: { stock },
      });
    }
  }

  static async updateProductGallery(
    productId: string,
    image: string,
    images: string[]
  ) {
    return await prisma.$transaction(async (tx) => {
      await tx.product.update({
        where: { id: productId },
        data: { image },
      });
      await tx.productGallery.update({
        where: { productId },
        data: { images },
      });
    });
  }

  static async deleteProduct(id: string) {
    return await prisma.$transaction(async (tx) => {
      await tx.productGallery.delete({ where: { productId: id } });
      await tx.productInfo.delete({ where: { productId: id } });
      await tx.productReview.deleteMany({ where: { productId: id } });
      await tx.cartProduct.deleteMany({ where: { productId: id } });
      await tx.orderProduct.deleteMany({ where: { productId: id } });
      await tx.product.delete({ where: { id } });
    });
  }
}

export default ProductService;
