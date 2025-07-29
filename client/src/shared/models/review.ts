export interface IReview {
  id: string;
  title: string;
  text: string;
  rate: string;
  productId: string;
}

export type TCreateReviewData = Pick<
  IReview,
  'productId' | 'title' | 'text' | 'rate'
>;

export interface IProductReview extends IReview {
  user: { username: string };
}

export interface IUserReview extends IReview {
  product: { name: string };
}
