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

  static async deleteReview(id: string) {
    await prisma.productReview.delete({ where: { id } }).catch(() => {
      throw new ApiError(404, ErrorMessage.REVIEW_NOT_FOUND);
    });
  }
}

export default ReviewService;
