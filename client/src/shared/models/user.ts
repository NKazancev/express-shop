import UserRole from '@config/userRoles';
import { IAddress } from './address';
import { ICartProduct } from './cart';

export interface IUser {
  id: string;
  email: string;
  password: string;
  username: string;
  role: UserRole;
}

export type TUserCart = Pick<IUser, 'username'> & {
  cartProducts: ICartProduct[];
};

export type TUserInfo = Pick<IUser, 'email' | 'username'> & {
  address: IAddress | null;
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
