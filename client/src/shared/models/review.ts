export interface IReview {
  id: string;
  title: string;
  text: string;
  rate: string;
  productId: string;
  userId: string;
}

export interface ICreateReviewData {
  title: string;
  text: string;
  rate: string;
}

export interface IProductReview extends IReview {
  user: { username: string };
}

export interface IUserReview extends IReview {
  product: { name: string };
}
