import prisma from '../config/prismaClient';
import ApiError from '../error/ApiError';
import ErrorMessage from '../error/errorMessage';

class CountryService {
  static async createCountry(name: string) {
    const foundCountry = await prisma.deliveryCountry.findFirst({
      where: { name },
    });
    if (foundCountry) throw new ApiError(409, ErrorMessage.COUNTRY_EXISTS);
    const country = await prisma.deliveryCountry.create({ data: { name } });
    return country;
  }

  static async getAllCountries() {
    const countries = await prisma.deliveryCountry.findMany();
    return countries;
  }

  static async deleteCountry(id: string) {
    await prisma.deliveryCountry.delete({ where: { id } }).catch(() => {
      throw new ApiError(404, ErrorMessage.COUNTRY_NOT_FOUND);
    });
  }
}

export default CountryService;
