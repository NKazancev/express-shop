import { OrderStatus } from '@config/orderStatus';

export interface IOrder {
  id: string;
  status: OrderStatus;
  netAmount: number;
  customer: string;
  address: string;
  contactInfo: string;
  createdAt?: Date;
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

export interface IOrderData extends IOrder {
  products: IOrderProduct[];
}

export interface IOrderProduct {
  id: string;
  quantity: number;
  name: string;
  image: string;
}

export interface IOrdersRequest {
  skip: number;
  take: number;
}

export interface IOrdersResponse<T> {
  data: T;
  quantity: number;
}
