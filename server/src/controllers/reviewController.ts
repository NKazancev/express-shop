import { Request, Response } from 'express';

import { ProductReviewSchema } from '../schema/productSchema';
import ReviewService from '../services/reviewService';

class ReviewController {
  static async createProductReview(req: Request, res: Response) {
    ProductReviewSchema.parse(req.body);
    const { title, text, value, productId } = req.body;
    const userId = req.user.id;

    const review = await ReviewService.createProductReview(
      title,
      text,
      value,
      productId,
      userId
    );
    res.status(201).json(review);
  }

  static async getProductReviews(req: Request, res: Response) {
    const { productId } = req.body;
    const reviews = await ReviewService.getProductReviews(productId);
    res.status(200).json(reviews);
  }

  static async hasUserReview(req: Request, res: Response) {
    const { productId } = req.body;
    const userId = req.user.id;
    await ReviewService.checkProductReview(userId, productId);
    res.status(204).json();
  }
}

export default ReviewController;
