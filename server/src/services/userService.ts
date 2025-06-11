import { hash } from 'bcrypt';

import { Role } from '@prisma/client';
import prisma from '../config/prismaClient';
import TokenService from './tokenService';
import ApiError from '../error/ApiError';
import ErrorMessage from '../error/errorMessage';

class UserService {
  static async createUser(email: string, password: string, role: Role) {
    const foundUser = await prisma.user.findFirst({ where: { email } });
    if (foundUser) throw new ApiError(409, ErrorMessage.USER_EXISTS);

    const hashedPassword = await hash(password, 10);
    const user = await prisma.user.create({
      data: { email, password: hashedPassword, role },
    });

    const { accessToken, refreshToken } = TokenService.createTokens(
      user.id,
      user.role
    );
    return { user, accessToken, refreshToken };
  }

  static async getUserInfo(userId: string) {
    const info = await prisma.user.findFirst({ where: { id: userId } });
    return info;
  }
}

export default UserService;
