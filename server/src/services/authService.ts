import { compare } from 'bcrypt';
import { verify } from 'jsonwebtoken';

import { REFRESH_TOKEN_KEY } from '../config/envVariables';
import prisma from '../config/prismaClient';
import TokenService from './tokenService';
import ApiError from '../error/ApiError';
import ErrorMessage from '../error/errorMessage';

class AuthService {
  static async login(email: string, password: string) {
    const user = await prisma.user.findFirst({ where: { email } });
    if (!user) throw new ApiError(400, ErrorMessage.CREDENTIALS);

    const match = await compare(password, user.password);
    if (!match) throw new ApiError(400, ErrorMessage.CREDENTIALS);

    const { accessToken, refreshToken } = TokenService.createTokens(
      user.id,
      user.role
    );
    return { accessToken, refreshToken, role: user.role };
  }

  static async refresh(refreshToken: string) {
    if (!refreshToken) throw new ApiError(401, ErrorMessage.UNAUTHORIZED);

    const payload = verify(refreshToken, REFRESH_TOKEN_KEY) as { id: string };
    if (!payload) throw new ApiError(403, ErrorMessage.FORBIDDEN);

    const user = await prisma.user.findFirst({ where: { id: payload.id } });
    if (!user) throw new ApiError(403, ErrorMessage.FORBIDDEN);

    const accessToken = TokenService.createAccessToken(user.id, user.role);
    return { accessToken, role: user.role };
  }
}

export default AuthService;
