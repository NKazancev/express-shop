import { Request, Response } from 'express';

import { CreateUserSchema } from '../schema/userSchema';
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
}

export default UserController;
