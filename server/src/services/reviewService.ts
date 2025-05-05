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

  static async getProductReview(userId: string, productId: string) {
    const foundReview = await prisma.productReview.findFirst({
      where: { userId, productId },
    });
    return foundReview;
  }
}

export default ReviewService;
