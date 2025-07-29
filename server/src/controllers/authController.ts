import { Request, Response } from 'express';

import { LoginUserSchema } from '../schema/authSchema';
import AuthService from '../services/authService';

class AuthController {
  static async login(req: Request, res: Response) {
    LoginUserSchema.parse(req.body);
    const { email, password } = req.body;
    const { accessToken, refreshToken, role } = await AuthService.login(
      email,
      password
    );
    res
      .cookie('jwt', refreshToken, {
        httpOnly: true,
        sameSite: 'none',
        secure: true,
        maxAge: 7 * 24 * 60 * 60 * 1000,
      })
      .cookie('authSession', role, {
        httpOnly: false,
        sameSite: 'none',
        secure: true,
        maxAge: 7 * 24 * 60 * 60 * 1000,
      })
      .status(200)
      .json({ accessToken, role });
  }

  static async logout(req: Request, res: Response) {
    if (!req.cookies.jwt) {
      res.sendStatus(204);
      return;
    }
    res
      .clearCookie('jwt', { httpOnly: true, sameSite: 'none', secure: true })
      .clearCookie('authSession', {
        httpOnly: false,
        sameSite: 'none',
        secure: true,
      })
      .status(204)
      .json();
  }

  static async refresh(req: Request, res: Response) {
    const refreshToken = req.cookies.jwt;
    const { accessToken, role } = await AuthService.refresh(refreshToken);
    res.status(200).json({ accessToken, role });
  }
}

export default AuthController;
