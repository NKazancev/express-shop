import { sign } from 'jsonwebtoken';

import { Role } from '@prisma/client';
import { ACCESS_TOKEN_KEY, REFRESH_TOKEN_KEY } from '../config/envVariables';

class TokenService {
  static createTokens(id: string, role: Role) {
    return {
      accessToken: TokenService.createAccessToken(id, role),
      refreshToken: TokenService.createRefreshToken(id),
    };
  }

  static createAccessToken(id: string, role: Role) {
    const accessToken = sign({ id, role }, ACCESS_TOKEN_KEY, {
      expiresIn: 30,
    });
    return accessToken;
  }

  static createRefreshToken(id: string) {
    const refreshToken = sign({ id }, REFRESH_TOKEN_KEY, {
      expiresIn: '24h',
    });
    return refreshToken;
  }
}

export default TokenService;
