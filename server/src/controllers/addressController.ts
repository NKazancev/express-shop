import { Request, Response } from 'express';
import CreateAddressSchema from '../schema/addressSchema';
import AddressService from '../services/addressService';

class AddressController {
  static async createAddress(req: Request, res: Response) {
    CreateAddressSchema.parse(req.body);
    const userId = req.user.id;
    const { countryId, cityId, street, postcode } = req.body;
    const address = await AddressService.createAddress(
      userId,
      countryId,
      cityId,
      street,
      postcode
    );
    res.status(200).json(address);
  }

  static async getAddress(req: Request, res: Response) {
    const userId = req.user.id;
    const address = await AddressService.getAddress(userId);
    res.status(200).json(address);
  }
}

export default AddressController;
