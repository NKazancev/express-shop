import UserRole from '@config/userRoles';
import { IAddress } from './address';

export interface IUser {
  id: string;
  email: string;
  password: string;
  username: string;
  role: UserRole;
}

export interface IUserInfo extends IUser {
  address: IAddress;
  stringAddress: string;
}

export interface ICreateUserData {
  email: string;
  password: string;
  confirmPassword: string;
}

export interface IPasswordData {
  oldPassword: string;
  newPassword: string;
  confirmPassword: string;
}
