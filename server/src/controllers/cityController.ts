import { Request, Response } from 'express';
import CityService from '../services/cityService';
import { DeliveryCitySchema } from '../schema/countrySchema';
import ResMessage from '../config/resMessage';

class CityController {
  static async createCity(req: Request, res: Response) {
    DeliveryCitySchema.parse(req.body);
    const { name, countryId } = req.body;
    await CityService.createCity(name, countryId);
    res.status(201).json({ message: ResMessage.SUCCESS });
  }

  static async getAllCitiesByCountryId(req: Request, res: Response) {
    const countryId = String(req.query.countryId);
    const citites = await CityService.getAllCitiesByCountryId(countryId);
    res.status(200).json(citites);
  }

  static async deleteCity(req: Request, res: Response) {
    await CityService.deleteCity(req.params.id);
    res.status(204).json();
  }
}

export default CityController;
