export interface ILoginUserData {
  email: string;
  password: string;
}

export interface IRegistrationUserData extends ILoginUserData {
  repeatPassword: string;
}

export interface IAuthUserResponse {
  token: string;
  role: string;
}
