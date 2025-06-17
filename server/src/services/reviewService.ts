import prisma from '../config/prismaClient';

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
}

export default ReviewService;
