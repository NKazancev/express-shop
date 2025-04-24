import { IProduct } from './product';

export interface ICartProduct {
  id: string;
  quantity: number;
  product: IProduct;
  productId?: string;
  userId?: string;
}
