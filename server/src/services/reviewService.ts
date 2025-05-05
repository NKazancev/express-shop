import prisma from '../config/prismaClient';
import ApiError from '../error/ApiError';
import ErrorMessage from '../error/errorMessage';

class ReviewService {
  static async createProductReview(
    title: string,
    text: string,
    value: string,
    userId: string,
    productId: string
  ) {
    const review = await prisma.productReview.create({
      data: {
        title,
        text,
        userId,
        productId,
        rating: { create: { value } },
      },
    });
    return review;
  }

  static async getProductReviews(productId: string) {
    const reviews = await prisma.productReview.findMany({
      where: { productId },
    });
    return reviews;
  }

  static async checkProductReview(userId: string, productId: string) {
    const foundReview = await prisma.productReview.findFirst({
      where: { userId, productId },
    });
    if (foundReview) throw new ApiError(409, ErrorMessage.REVIEW_EXISTS);
  }
}

export default ReviewService;
