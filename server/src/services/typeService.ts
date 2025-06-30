import prisma from '../config/prismaClient';
import ApiError from '../error/ApiError';
import ErrorMessage from '../error/errorMessage';

class TypeService {
  static async createType(name: string) {
    const foundType = await prisma.productType.findFirst({
      where: { name: { equals: name, mode: 'insensitive' } },
    });
    if (foundType) throw new ApiError(409, ErrorMessage.PRODUCT_TYPE_EXISTS);
    const type = await prisma.productType.create({ data: { name } });
    return type;
  }

  static async getAllTypes() {
    const types = await prisma.productType.findMany();
    return types;
  }

  static async deleteType(id: string) {
    const hasProducts = await prisma.product.findFirst({
      where: { typeId: id },
    });
    if (hasProducts) throw new ApiError(400, ErrorMessage.BAD_REQUEST);
    await prisma.productType.delete({ where: { id } }).catch(() => {
      throw new ApiError(404, ErrorMessage.PRODUCT_TYPE_NOT_FOUND);
    });
  }
}

export default TypeService;
