import prisma from '../config/prismaClient';
import ApiError from '../error/ApiError';
import ErrorMessage from '../error/errorMessage';
import CityService from './cityService';

class CountryService {
  static async createCountry(name: string) {
    const foundCountry = await prisma.deliveryCountry.findFirst({
      where: { name: { equals: name, mode: 'insensitive' } },
    });
    if (foundCountry) throw new ApiError(409, ErrorMessage.COUNTRY_EXISTS);
    const country = await prisma.deliveryCountry.create({ data: { name } });
    return country;
  }

  static async getAllCountries() {
    const countries = await prisma.deliveryCountry.findMany();
    return countries;
  }

  static async getCountryNameById(countryId: string) {
    const city = await prisma.deliveryCountry.findFirst({
      where: { id: countryId },
      select: { name: true },
    });
    return city;
  }

  static async deleteCountry(countryId: string) {
    const foundCountry = await prisma.deliveryCountry.findFirst({
      where: { id: countryId },
    });
    if (!foundCountry) throw new ApiError(404, ErrorMessage.COUNTRY_NOT_FOUND);

    const foundCities = await CityService.getAllCitiesByCountryId(countryId);
    if (foundCities.length)
      throw new ApiError(409, ErrorMessage.COUNTRY_CONFLICT);

    await prisma.deliveryCountry.delete({ where: { id: countryId } });
  }
}

export default CountryService;
