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
    return await prisma.productReview.create({
      data: {
        title,
        text,
        rate,
        productId,
        userId,
      },
    });
  }

  static async getAllUserReviews(userId: string) {
    const reviews = await prisma.productReview.findMany({
      where: { userId },
      include: { product: { select: { name: true } } },
      omit: { userId: true },
    });
    return reviews;
  }

  static async getUserReview(userId: string, productId: string) {
    const userReview = await prisma.productReview.findFirst({
      where: { userId, productId },
      include: { user: { select: { username: true } } },
      omit: { userId: true },
    });
    return userReview;
  }

  static async deleteReview(userId: string, reviewId: string) {
    const review = await prisma.productReview.findFirst({
      where: { id: reviewId },
    });
    if (!review) throw new ApiError(404, ErrorMessage.REVIEW_NOT_FOUND);
    if (review?.userId !== userId) {
      throw new ApiError(403, ErrorMessage.FORBIDDEN);
    }
    return await prisma.productReview.delete({ where: { id: reviewId } });
  }
}

export default ReviewService;
