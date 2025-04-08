import prisma from '../config/prismaClient';
import ApiError from '../error/ApiError';
import ErrorMessage from '../error/errorMessage';

class ProductTypeService {
  static async createType(name: string) {
    const foundType = await prisma.productType.findFirst({ where: { name } });
    if (foundType) throw new ApiError(409, ErrorMessage.PRODUCT_TYPE_EXISTS);
    const type = await prisma.productType.create({ data: { name } });
    return type;
  }

  static async getAllTypes() {
    const types = await prisma.productType.findMany();
    return types;
  }

  static async updateType(id: string, name: string) {
    const type = await prisma.productType
      .update({ where: { id }, data: { name } })
      .catch(() => {
        throw new ApiError(404, ErrorMessage.PRODUCT_TYPE_NOT_FOUND);
      });
    return type;
  }

  static async deleteType(id: string) {
    await prisma.productType.delete({ where: { id } }).catch(() => {
      throw new ApiError(404, ErrorMessage.PRODUCT_TYPE_NOT_FOUND);
    });
  }
}

export default ProductTypeService;
