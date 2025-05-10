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

  static async getUserReview(userId: string, productId: string) {
    const foundReview = await prisma.productReview.findFirst({
      where: { userId, productId },
      include: { user: { select: { email: true } } },
    });
    return foundReview;
  }
}

export default ReviewService;
