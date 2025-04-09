import prisma from '../config/prismaClient';
import ApiError from '../error/ApiError';
import ErrorMessage from '../error/errorMessage';

class BrandService {
  static async createBrand(name: string) {
    const foundBrand = await prisma.productBrand.findFirst({ where: { name } });
    if (foundBrand) throw new ApiError(409, ErrorMessage.PRODUCT_BRAND_EXISTS);
    const brand = await prisma.productBrand.create({ data: { name } });
    return brand;
  }

  static async getAllBrands() {
    const brands = await prisma.productBrand.findMany();
    return brands;
  }

  static async deleteBrand(id: string) {
    const hasProducts = await prisma.product.findFirst({
      where: { brandId: id },
    });
    if (hasProducts) throw new ApiError(400, ErrorMessage.BAD_REQUEST);
    await prisma.productBrand.delete({ where: { id } }).catch(() => {
      throw new ApiError(404, ErrorMessage.PRODUCT_BRAND_NOT_FOUND);
    });
  }
}

export default BrandService;
