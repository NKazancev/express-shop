import prisma from '../config/prismaClient';
import ApiError from '../error/ApiError';
import ErrorMessage from '../error/errorMessage';

class TypeService {
  static async createType(name: string) {
    const foundType = await prisma.productType.findFirst({
      where: { name: { equals: name, mode: 'insensitive' } },
    });
    if (foundType) throw new ApiError(409, ErrorMessage.PRODUCT_TYPE_EXISTS);
    await prisma.productType.create({ data: { name } });
  }

  static async getAllTypes() {
    const types = await prisma.productType.findMany();
    return types;
  }

  static async deleteType(typeId: string) {
    const foundType = await prisma.productType.findFirst({
      where: { id: typeId },
    });
    if (!foundType) {
      throw new ApiError(400, ErrorMessage.PRODUCT_TYPE_NOT_FOUND);
    }
    const hasProducts = await prisma.product.findFirst({
      where: { typeId },
    });
    if (hasProducts) throw new ApiError(409, ErrorMessage.TYPE_CONFLICT);
    await prisma.productType.delete({ where: { id: typeId } });
  }
}

export default TypeService;
