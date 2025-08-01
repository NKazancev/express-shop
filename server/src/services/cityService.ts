import prisma from '../config/prismaClient';
import ApiError from '../error/ApiError';
import ErrorMessage from '../error/errorMessage';

class CityService {
  static async createCity(name: string, countryId: string) {
    const foundCity = await prisma.deliveryCity.findFirst({
      where: {
        name: { equals: name, mode: 'insensitive' },
        countryId,
      },
    });
    if (foundCity) throw new ApiError(409, ErrorMessage.CITY_EXISTS);
    return await prisma.deliveryCity.create({
      data: { name, countryId },
    });
  }

  static async getAllCitiesByCountryId(countryId: string) {
    const cities = await prisma.deliveryCity.findMany({
      where: { countryId },
    });
    return cities;
  }

  static async getCityNameById(cityId: string) {
    const city = await prisma.deliveryCity.findFirst({
      where: { id: cityId },
      select: { name: true },
    });
    return city;
  }

  static async deleteCity(cityId: string) {
    const city = await prisma.deliveryCity.findFirst({ where: { id: cityId } });
    if (!city) throw new ApiError(404, ErrorMessage.CITY_NOT_FOUND);
    return await prisma.deliveryCity.delete({ where: { id: cityId } });
  }
}

export default CityService;
