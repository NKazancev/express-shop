import prisma from '../config/prismaClient';
import ApiError from '../error/ApiError';
import ErrorMessage from '../error/errorMessage';

class BrandService {
  static async createBrand(name: string) {
    const foundBrand = await prisma.productBrand.findFirst({
      where: { name: { equals: name, mode: 'insensitive' } },
    });
    if (foundBrand) throw new ApiError(409, ErrorMessage.PRODUCT_BRAND_EXISTS);
    return await prisma.productBrand.create({ data: { name } });
  }

  static async getAllBrands() {
    const brands = await prisma.productBrand.findMany();
    return brands;
  }

  static async deleteBrand(brandId: string) {
    const foundBrand = await prisma.productBrand.findFirst({
      where: { id: brandId },
    });
    if (!foundBrand) {
      throw new ApiError(400, ErrorMessage.PRODUCT_BRAND_NOT_FOUND);
    }
    const hasProducts = await prisma.product.findFirst({
      where: { brandId },
    });
    if (hasProducts) throw new ApiError(409, ErrorMessage.BRAND_CONFLICT);
    await prisma.productBrand.delete({ where: { id: brandId } });
  }
}

export default BrandService;
