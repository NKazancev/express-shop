import { Request, Response } from 'express';

import { ProductReviewSchema } from '../schema/productSchema';
import ReviewService from '../services/reviewService';

class ReviewController {
  static async createProductReview(req: Request, res: Response) {
    ProductReviewSchema.parse(req.body);
    const { title, text, rate, productId } = req.body;
    const userId = req.user.id;

    const review = await ReviewService.createProductReview(
      title,
      text,
      rate,
      productId,
      userId
    );
    res.status(201).json(review);
  }

  static async getProductReview(req: Request, res: Response) {
    const { productId } = req.params;
    const userId = req.user.id;
    const review = await ReviewService.getProductReview(userId, productId);
    res.status(200).json(review);
  }
}

export default ReviewController;
