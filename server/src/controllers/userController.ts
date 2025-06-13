import { Request, Response } from 'express';

import { ChangePasswordSchema, CreateUserSchema } from '../schema/userSchema';
import UserService from '../services/userService';

class UserController {
  static async createUser(req: Request, res: Response) {
    CreateUserSchema.parse(req.body);
    const { email, password, role } = req.body;
    const { accessToken, refreshToken, user } = await UserService.createUser(
      email,
      password,
      role
    );
    res
      .cookie('jwt', refreshToken, {
        httpOnly: true,
        sameSite: 'none',
        secure: true,
        maxAge: 7 * 24 * 60 * 60 * 1000,
      })
      .cookie('authSession', 'ok', {
        httpOnly: false,
        sameSite: 'none',
        secure: true,
        maxAge: 7 * 24 * 60 * 60 * 1000,
      })
      .status(201)
      .json({ accessToken, role: user.role });
  }

  static async getUser(req: Request, res: Response) {
    const userId = req.user.id;
    const info = await UserService.getUserInfo(userId);
    res.status(200).json(info);
  }

  static async changePassword(req: Request, res: Response) {
    ChangePasswordSchema.parse(req.body);
    const userId = req.user.id;
    const { oldPassword, newPassword } = req.body;
    const user = await UserService.changePassword(
      userId,
      oldPassword,
      newPassword
    );
    res.status(200).json(user);
  }
}

export default UserController;
