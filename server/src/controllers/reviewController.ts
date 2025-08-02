import { Request, Response } from 'express';

import { ProductReviewSchema } from '../schema/productSchema';
import ReviewService from '../services/reviewService';
import ResMessage from '../config/resMessage';

class ReviewController {
  static async createProductReview(req: Request, res: Response) {
    ProductReviewSchema.parse(req.body);
    const { title, text, rate, productId } = req.body;
    const userId = req.user.id;

    await ReviewService.createProductReview(
      title,
      text,
      rate,
      productId,
      userId
    );
    res.status(201).json({ message: ResMessage.SUCCESS });
  }

  static async getAllUserReviews(req: Request, res: Response) {
    const skip = Number(req.query.skip) || 0;
    const take = Number(req.query.take) || 3;
    const userId = req.user.id;
    const { reviews, quantity } = await ReviewService.getAllUserReviews(
      userId,
      skip,
      take
    );
    res.status(200).json({ data: reviews, quantity });
  }

  static async getUserReview(req: Request, res: Response) {
    const productId = req.params.id;
    const userId = req.user.id;
    const review = await ReviewService.getUserReview(userId, productId);
    res.status(200).json(review);
  }

  static async deleteReview(req: Request, res: Response) {
    const userId = req.user.id;
    const reviewId = req.params.id;
    await ReviewService.deleteReview(userId, reviewId);
    res.status(204).json();
  }
}

export default ReviewController;
