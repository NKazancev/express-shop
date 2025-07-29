import { IProduct } from './product';

export interface ICartProduct {
  id: string;
  quantity: number;
  product: Pick<IProduct, 'image' | 'name' | 'price'>;
}
