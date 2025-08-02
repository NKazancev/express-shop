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

export interface IReviewsRequest {
  skip: number;
  take: number;
}

export interface IReviewsResponse {
  data: IUserReview[];
  quantity: number;
}
