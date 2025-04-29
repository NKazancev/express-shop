import { Request, Response } from 'express';

import ProductService from '../services/productService';
import {
  CreateProductSchema,
  UpdateProductSchema,
} from '../schema/productSchema';

class ProductController {
  static async createProduct(req: Request, res: Response) {
    const parsedData = JSON.parse(req.body.data);
    const data = { ...parsedData, price: Number(parsedData.price) };
    CreateProductSchema.parse(data);

    const files = req.files as { [fieldname: string]: Express.Multer.File[] };
    const image = files['image'][0].filename;
    const images = files['gallery'].map((file) => file.filename);

    const product = await ProductService.createProduct(
      { ...data },
      image,
      images
    );
    res.status(201).json(product);
  }

  static async getProducts(req: Request, res: Response) {
    const searchQuery = String(req.query.searchQuery) || '';
    const productType = String(req.query.productType);
    const brandFilters = String(req.query.brandFilters);
    const minPrice = Number(req.query.minPrice);
    const maxPrice = Number(req.query.maxPrice);
    const skip = Number(req.query.skip) || 0;
    const take = 10;
    const products = await ProductService.getProducts(
      searchQuery,
      productType,
      brandFilters,
      minPrice,
      maxPrice,
      skip,
      take
    );
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
