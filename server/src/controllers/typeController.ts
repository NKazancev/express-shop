import { Request, Response } from 'express';

import { ProductTypeSchema } from '../schema/productSchema';
import TypeService from '../services/typeService';

class TypeController {
  static async createType(req: Request, res: Response) {
    ProductTypeSchema.parse(req.body);
    const { name } = req.body;
    const type = await TypeService.createType(name);
    res.status(201).json(type);
  }

  static async getAllTypes(req: Request, res: Response) {
    const types = await TypeService.getAllTypes();
    res.status(200).json(types);
  }

  static async deleteType(req: Request, res: Response) {
    await TypeService.deleteType(req.params.id);
    res.status(204).json();
  }
}

export default TypeController;
