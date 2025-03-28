import { Request, Response } from 'express';
import ProductService from '../services/productService';
import {
  CreateProductSchema,
  UpdateProductSchema,
} from '../schema/productSchema';

class ProductController {
  static async createProduct(req: Request, res: Response) {
    CreateProductSchema.parse(req.body);
    const product = await ProductService.createProduct({ ...req.body });
    res.status(201).json(product);
  }

  static async getProducts(req: Request, res: Response) {
    const skip = Number(req.query.skip) || 0;
    const take = 10;
    const products = await ProductService.getProducts(skip, take);
    res.status(200).json(products);
  }

  static async getProductById(req: Request, res: Response) {
    const product = await ProductService.getProductById(req.params.id);
    res.status(200).json(product);
  }

  static async updateProduct(req: Request, res: Response) {
    UpdateProductSchema.parse(req.body);
    const product = await ProductService.updateProduct(req.params.id, {
      ...req.body,
    });
    res.status(200).json(product);
  }

  static async deleteProduct(req: Request, res: Response) {
    await ProductService.deleteProduct(req.params.id);
    res.status(204).json();
  }
}

export default ProductController;
