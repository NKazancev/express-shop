import { Request, Response } from 'express';

import { ProductTypeSchema } from '../schema/productSchema';
import ProductTypeService from '../services/productTypeService';

class ProductTypeController {
  static async createType(req: Request, res: Response) {
    ProductTypeSchema.parse(req.body);
    const { name } = req.body;
    const type = await ProductTypeService.createType(name);
    res.status(201).json(type);
  }

  static async getAllTypes(req: Request, res: Response) {
    const types = await ProductTypeService.getAllTypes();
    res.status(200).json(types);
  }

  static async updateType(req: Request, res: Response) {
    ProductTypeSchema.parse(req.body);
    const { name } = req.body;
    const type = await ProductTypeService.updateType(req.params.id, name);
    res.status(200).json(type);
  }

  static async deleteType(req: Request, res: Response) {
    await ProductTypeService.deleteType(req.params.id);
    res.status(204).json();
  }
}

export default ProductTypeController;
