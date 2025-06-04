import { IProduct } from './product';

export interface IOrder {
  id: string;
  status: string;
  netAmount: number;
  customer: string;
  address: string;
  contactInfo: string;
  userId: string;
}

export interface IOrderProduct {
  id: string;
  quantity: number;
  product: IProduct;
}

export interface ICreateOrderData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  country: string;
  city: string;
  street: string;
  postcode: string;
}
