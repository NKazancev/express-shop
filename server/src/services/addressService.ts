import prisma from '../config/prismaClient';
import CityService from './cityService';
import CountryService from './countryService';

class AddressService {
  static async createAddress(
    userId: string,
    countryId: string,
    cityId: string,
    street: string,
    postcode: string
  ) {
    const address = await prisma.address.create({
      data: { userId, countryId, cityId, street, postcode },
    });
    return address;
  }

  static async createStringAddress(
    countryId: string,
    cityId: string,
    street: string,
    postcode: string
  ) {
    const country = await CountryService.getCountryNameById(countryId);
    const city = await CityService.getCityNameById(cityId);
    return `${country?.name}, ${city?.name}, ${street}, ${postcode}`;
  }

  static async getAddress(userId: string) {
    const address = await prisma.address.findFirst({ where: { userId } });
    return address;
  }
}

export default AddressService;
