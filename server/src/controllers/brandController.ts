import { Request, Response } from 'express';

import { ProductBrandSchema } from '../schema/productSchema';
import BrandService from '../services/brandService';

class ProductBrandController {
  static async createBrand(req: Request, res: Response) {
    ProductBrandSchema.parse(req.body);
    const { name } = req.body;
    const brand = await BrandService.createBrand(name);
    res.status(201).json(brand);
  }

  static async getAllBrands(req: Request, res: Response) {
    const brands = await BrandService.getAllBrands();
    res.status(200).json(brands);
  }

  static async deleteBrand(req: Request, res: Response) {
    await BrandService.deleteBrand(req.params.id);
    res.status(204).json();
  }
}

export default ProductBrandController;
