export interface IOrder {
  id: string;
  status: string;
  netAmount: number;
  customer: string;
  address: string;
  contactInfo: string;
  userId: string;
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
