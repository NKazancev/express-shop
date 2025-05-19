import { Request, Response } from 'express';
import CountryService from '../services/countryService';
import { DeliveryCountrySchema } from '../schema/countrySchema';

class CountryController {
  static async createCountry(req: Request, res: Response) {
    DeliveryCountrySchema.parse(req.body);
    const { name } = req.body;
    const country = await CountryService.createCountry(name);
    res.status(201).json(country);
  }

  static async getCountries(req: Request, res: Response) {
    const countries = await CountryService.getAllCountries();
    res.status(200).json(countries);
  }

  static async deleteCountry(req: Request, res: Response) {
    await CountryService.deleteCountry(req.params.id);
    res.status(204).json();
  }
}

export default CountryController;
