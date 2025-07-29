import { Address } from '@prisma/client';
import prisma from '../config/prismaClient';
import CityService from './cityService';
import CountryService from './countryService';

class AddressService {
  static async createAddress(data: Omit<Address, 'id'>) {
    const address = await prisma.address.create({
      data: { ...data },
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
    const address = await prisma.address.findFirst({
      where: { userId },
      omit: { userId: true },
    });
    return address;
  }

  static async updateAddress(addressId: string, data: Partial<Address>) {
    return await prisma.address.update({
      where: { id: addressId },
      data,
    });
  }
}

export default AddressService;
