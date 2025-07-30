import UserRole from '@config/userRoles';
import { ICartProduct } from './cart';
import { IAddress } from './address';

export interface IUser {
  id: string;
  email: string;
  password: string;
  username: string;
  role: UserRole;
}

export type TUserCart = Pick<IUser, 'username'> & {
  cartProducts: Pick<ICartProduct, 'quantity'>[];
};

export type TUserInfo = Pick<IUser, 'email' | 'username'> & {
  address: IAddress;
  stringAddress?: string;
};

export type TCreateUserData = Pick<IUser, 'email' | 'password'> & {
  confirmPassword: string;
};

export interface IPasswordData {
  oldPassword: string;
  newPassword: string;
  confirmPassword: string;
}
