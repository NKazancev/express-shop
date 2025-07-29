import { Request, Response } from 'express';
import {
  CreateAddressSchema,
  UpdateAddressSchema,
} from '../schema/addressSchema';
import AddressService from '../services/addressService';
import ResMessage from '../config/resMessage';

class AddressController {
  static async createAddress(req: Request, res: Response) {
    CreateAddressSchema.parse(req.body);
    const userId = req.user.id;
    await AddressService.createAddress({ userId, ...req.body });
    res.status(200).json({ message: ResMessage.SUCCESS });
  }

  static async getAddress(req: Request, res: Response) {
    const userId = req.user.id;
    const address = await AddressService.getAddress(userId);
    res.status(200).json(address);
  }

  static async updateAddress(req: Request, res: Response) {
    UpdateAddressSchema.parse(req.body);
    const addressId = req.params.id;
    await AddressService.updateAddress(addressId, {
      ...req.body,
    });
    res.status(200).json({ message: ResMessage.SUCCESS });
  }
}

export default AddressController;
