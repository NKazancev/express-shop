import { Request, Response } from 'express';
import ProductService from '../services/productService';
import { CreateProductSchema, UpdateProductSchema } from '../schema/productSchema';

const productService = new ProductService();

class ProductController {
  async createProduct(req: Request, res: Response) {
    CreateProductSchema.parse(req.body);
    const product = await productService.createProduct({ ...req.body });
    res.status(201).json(product);
  }

  async getProducts(req: Request, res: Response) {
    const skip = Number(req.query.skip) || 0;
    const take = 10;
    const products = await productService.getProducts(skip, take);
    res.status(200).json(products);
  }

  async getProductById(req: Request, res: Response) {
    const product = await productService.getProductById(req.params.id);
    res.status(200).json(product);
  }

  async updateProduct(req: Request, res: Response) {
    UpdateProductSchema.parse(req.body);
    const product = await productService.updateProduct(req.params.id, { ...req.body });
    res.status(200).json(product);
  }

  async deleteProduct(req: Request, res: Response) {
    await productService.deleteProduct(req.params.id);
    res.status(204).json();
  }
}

export default ProductController;
