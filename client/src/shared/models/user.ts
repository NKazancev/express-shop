import UserRole from '@config/userRoles';

export interface IUser {
  id: string;
  email: string;
  password: string;
  role: UserRole;
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
