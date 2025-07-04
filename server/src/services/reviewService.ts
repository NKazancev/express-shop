import prisma from '../config/prismaClient';
import ApiError from '../error/ApiError';
import ErrorMessage from '../error/errorMessage';

class ReviewService {
  static async createProductReview(
    title: string,
    text: string,
    rate: number,
    productId: string,
    userId: string
  ) {
    const review = await prisma.productReview.create({
      data: {
        title,
        text,
        rate,
        productId,
        userId,
      },
    });
    return review;
  }

  static async getAllUserReviews(userId: string) {
    const reviews = await prisma.productReview.findMany({
      where: { userId },
      include: { product: { select: { name: true } } },
    });
    return reviews;
  }

  static async getUserReview(userId: string, productId: string) {
    const foundReview = await prisma.productReview.findFirst({
      where: { userId, productId },
      include: { user: { select: { username: true } } },
    });
    return foundReview;
  }

  static async deleteReview(userId: string, reviewId: string) {
    const review = await prisma.productReview.findFirst({
      where: { id: reviewId },
    });
    if (review?.userId !== userId) {
      throw new ApiError(403, ErrorMessage.FORBIDDEN);
    }
    await prisma.productReview.delete({ where: { id: reviewId } }).catch(() => {
      throw new ApiError(404, ErrorMessage.REVIEW_NOT_FOUND);
    });
  }
}

export default ReviewService;
