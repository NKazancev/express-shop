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
      where: { name: productData.name },
    });
    if (foundProduct) throw new ApiError(409, ErrorMessage.PRODUCT_EXISTS);

    const product = await prisma.product.create({
      data: {
        ...productData,
        image,
        gallery: { create: { images } },
        info: { create: { text } },
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
      if (!productType) {
        products = await prisma.product.findMany({ skip, take });
        return products;
      }
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
      include: {
        gallery: { select: { images: true } },
        info: { select: { text: true } },
        reviews: { include: { user: { select: { email: true } } } },
      },
    });
    if (!product) throw new ApiError(404, ErrorMessage.PRODUCT_NOT_FOUND);
    return product;
  }

  static async updateProductInfo(
    id: string,
    data: Pick<Product, 'name' | 'description' | 'price'>,
    text: string,
    stock: number
  ) {
    let updatedProduct;
    if (data) {
      updatedProduct = await prisma.product.update({
        where: { id },
        data: {
          name: data.name,
          description: data.description,
          price: data.price,
          stock,
          info: { update: { where: { productId: id }, data: { text } } },
        },
      });
    } else {
      updatedProduct = await prisma.product.update({
        where: { id },
        data: { stock },
      });
    }
    return updatedProduct;
  }

  static async deleteProduct(id: string) {
    await prisma.$transaction(async (tx) => {
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
