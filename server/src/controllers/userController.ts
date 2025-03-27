import { Request, Response } from 'express';

import UserService from '../services/userService';
import { UserLoginSchema, UserRegistrationSchema } from '../schema/userSchema';
import ApiError from '../error/ApiError';
import ErrorMessage from '../error/errorMessage';

const userService = new UserService();

class UserController {
  async register(req: Request, res: Response) {
    UserRegistrationSchema.parse(req.body);
    const { email, password, role } = req.body;
    const { accessToken, refreshToken, user } = await userService.register(email, password, role);

    res.cookie('jwt', refreshToken, {
      httpOnly: true,
      sameSite: 'none',
      secure: true,
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });
    res.status(201).json({ accessToken, role: user.role });
  }

  async login(req: Request, res: Response) {
    UserLoginSchema.parse(req.body);
    const { email, password } = req.body;
    const { accessToken, refreshToken, user } = await userService.login(email, password);

    res.cookie('jwt', refreshToken, {
      httpOnly: true,
      sameSite: 'none',
      secure: true,
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });
    res.status(200).json({ accessToken, role: user.role });
  }

  async logout(req: Request, res: Response) {
    if (!req.cookies.jwt) {
      res.sendStatus(204);
      return;
    }
    res.clearCookie('jwt', { httpOnly: true, sameSite: 'none', secure: true });
    res.json({ message: 'Cookie cleared' });
  }

  async refresh(req: Request, res: Response) {
    const refreshToken = req.cookies.jwt;
    if (!refreshToken) throw new ApiError(401, ErrorMessage.UNAUTHORIZED);
    const accessToken = await userService.refresh(refreshToken);
    res.json({ accessToken });
  }
}

export default UserController;
