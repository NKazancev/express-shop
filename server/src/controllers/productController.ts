import { Request, Response } from 'express';

import ProductService from '../services/productService';
import { CreateProductSchema } from '../schema/productSchema';
import ResMessage from '../config/resMessage';

class ProductController {
  static async createProduct(req: Request, res: Response) {
    const parsedData = JSON.parse(req.body.data);
    const data = { ...parsedData, price: Number(parsedData.price) };
    CreateProductSchema.parse(data);

    const { text, ...productData } = data;
    const files = req.files as { [fieldname: string]: Express.Multer.File[] };
    const catalogueImage = files['image'][0].filename;
    const galleryImages = files['images'].map((file) => file.filename);

    await ProductService.createProduct(
      productData,
      catalogueImage,
      galleryImages,
      text
    );
    res.status(201).json({ message: ResMessage.SUCCESS });
  }

  static async getProducts(req: Request, res: Response) {
    const searchQuery = String(req.query.searchQuery) || '';
    const productType = String(req.query.productTypeId);
    const brandFilters = String(req.query.brandFilters);
    const minPrice = Number(req.query.minPrice);
    const maxPrice = Number(req.query.maxPrice);
    const skip = Number(req.query.skip) || 0;
    const take = Number(req.query.take) || 8;

    const { products, quantity } = await ProductService.getProducts(
      searchQuery,
      productType,
      brandFilters,
      minPrice,
      maxPrice,
      skip,
      take
    );
    res.status(200).json({ data: products, quantity });
  }

  static async getProductById(req: Request, res: Response) {
    const product = await ProductService.getProductById(req.params.id);
    res.status(200).json(product);
  }

  static async updateProductInfo(req: Request, res: Response) {
    const { text, stock } = req.body;
    await ProductService.updateProductInfo(
      req.params.id,
      req.body,
      text,
      stock
    );
    res.status(200).json({ message: ResMessage.SUCCESS });
  }

  static async updateProductGallery(req: Request, res: Response) {
    const parsedData = JSON.parse(req.body.data);
    const { productId } = parsedData;

    const files = req.files as { [fieldname: string]: Express.Multer.File[] };
    const image = files['image']?.[0].filename;
    const images = files['images']?.map((file) => file.filename);

    await ProductService.updateProductGallery(productId, image, images);
    res.status(200).json({ message: ResMessage.SUCCESS });
  }

  static async deleteProduct(req: Request, res: Response) {
    await ProductService.deleteProduct(req.params.id);
    res.status(204).json();
  }
}

export default ProductController;
