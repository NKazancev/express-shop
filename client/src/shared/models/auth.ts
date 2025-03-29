export interface ILoginData {
  email: string;
  password: string;
}

export interface IAuthResponse {
  accessToken: string;
  role: string;
}
