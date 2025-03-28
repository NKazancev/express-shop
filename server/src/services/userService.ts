import { sign, verify } from 'jsonwebtoken';
import { compare, hash } from 'bcrypt';

import { ACCESS_TOKEN_KEY, REFRESH_TOKEN_KEY } from '../config/envVariables';
import prisma from '../config/prismaClient';
import { Role } from '@prisma/client';
import ApiError from '../error/ApiError';
import ErrorMessage from '../error/errorMessage';

class UserService {
  static generateTokens(id: string, role: Role) {
    const accessToken = sign({ id, role }, ACCESS_TOKEN_KEY, { expiresIn: 30 });
    const refreshToken = sign({ id }, REFRESH_TOKEN_KEY, { expiresIn: '24h' });
    return { accessToken, refreshToken };
  }

  async register(email: string, password: string, role: Role) {
    const foundUser = await prisma.user.findFirst({ where: { email } });
    if (foundUser) throw new ApiError(409, ErrorMessage.USER_EXISTS);

    const hashedPassword = await hash(password, 10);
    const user = await prisma.user.create({
      data: { email, password: hashedPassword, role },
    });
    const { accessToken, refreshToken } = UserService.generateTokens(user.id, user.role);
    return { user, accessToken, refreshToken };
  }

  async login(email: string, password: string) {
    const user = await prisma.user.findFirst({ where: { email } });
    if (!user) throw new ApiError(400, ErrorMessage.CREDENTIALS);

    const match = await compare(password, user.password);
    if (!match) throw new ApiError(400, ErrorMessage.CREDENTIALS);

    const { accessToken, refreshToken } = UserService.generateTokens(user.id, user.role);
    return { user, accessToken, refreshToken };
  }

  async refresh(refreshToken: string) {
    const payload = verify(refreshToken, REFRESH_TOKEN_KEY) as { id: string };
    const user = await prisma.user.findFirst({ where: { id: payload.id } });
    if (!user) throw new ApiError(403, ErrorMessage.FORBIDDEN);

    const accessToken = sign({ id: user.id, role: user.role }, ACCESS_TOKEN_KEY, {
      expiresIn: 30,
    });
    return { accessToken, role: user.role };
  }
}

export default UserService;
