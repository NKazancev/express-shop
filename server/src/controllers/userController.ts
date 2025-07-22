import { Request, Response } from 'express';

import {
  ChangePasswordSchema,
  ChangeUsernameSchema,
  CreateUserSchema,
} from '../schema/userSchema';
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
      .cookie('authSession', user.role, {
        httpOnly: false,
        sameSite: 'none',
        secure: true,
        maxAge: 7 * 24 * 60 * 60 * 1000,
      })
      .status(201)
      .json({ accessToken, role: user.role });
  }

  static async getUserCart(req: Request, res: Response) {
    const userId = req.user.id;
    const user = await UserService.getUserCart(userId);
    res.status(200).json(user);
  }

  static async getUserInfo(req: Request, res: Response) {
    const userId = req.user.id;
    const userInfo = await UserService.getUserInfo(userId);
    res.status(200).json(userInfo);
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

  static async changeUsername(req: Request, res: Response) {
    ChangeUsernameSchema.parse(req.body);
    const userId = req.user.id;
    const { username } = req.body;
    const user = await UserService.changeUsername(userId, username);
    res.status(200).json(user);
  }

  static async deleteUser(req: Request, res: Response) {
    const userId = req.user.id;
    await UserService.deleteUser(userId);
    res.status(204).json();
  }
}

export default UserController;
