export interface ILoginUserData {
  email: string;
  password: string;
}

export interface IRegistrationUserData extends ILoginUserData {
  repeatPassword: string;
}

export interface IAuthUserResponse {
  accessToken: string;
  role: string;
}
