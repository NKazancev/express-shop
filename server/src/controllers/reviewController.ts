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

  static async getUserReview(req: Request, res: Response) {
    const productId = req.params.id;
    const userId = req.user.id;
    const review = await ReviewService.getUserReview(userId, productId);
    res.status(200).json(review);
  }
}

export default ReviewController;
