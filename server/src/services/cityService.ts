import prisma from '../config/prismaClient';
import ApiError from '../error/ApiError';
import ErrorMessage from '../error/errorMessage';

class CityService {
  static async createCity(name: string, countryId: string) {
    const foundCity = await prisma.deliveryCity.findFirst({
      where: { name, countryId },
    });
    if (foundCity) throw new ApiError(409, ErrorMessage.CITY_EXISTS);
    const city = await prisma.deliveryCity.create({
      data: { name, countryId },
    });
    return city;
  }

  static async getAllCitiesByCountryId(countryId: string) {
    const cities = await prisma.deliveryCity.findMany({
      where: { countryId },
    });
    return cities;
  }

  static async deleteCity(id: string) {
    await prisma.deliveryCity.delete({ where: { id } }).catch(() => {
      throw new ApiError(404, ErrorMessage.CITY_NOT_FOUND);
    });
  }
}

export default CityService;
