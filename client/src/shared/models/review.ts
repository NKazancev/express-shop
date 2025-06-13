export interface IProductReview {
  id: string;
  title: string;
  text: string;
  rate: string;
  productId: string;
  userId: string;
  user: { email: string };
}

export interface ICreateReviewData {
  title: string;
  text: string;
  rate: string;
}
