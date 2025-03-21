import { NextFunction, Request, Response } from 'express';
import { compare, hash } from 'bcrypt';
import { sign, verify } from 'jsonwebtoken';

import prisma from '../config/prismaClient';
import ApiError from '../error/ApiError';
import ErrorMessage from '../error/errorMessage';
import { ACCESS_TOKEN_KEY, REFRESH_TOKEN_KEY } from '../config/envVariables';
import { UserLoginSchema, UserRegistrationSchema } from '../schema/userSchema';

const register = async (req: Request, res: Response, next: NextFunction) => {
  try {
    UserRegistrationSchema.parse(req.body);
    const { email, password, role } = req.body;

    const foundUser = await prisma.user.findFirst({ where: { email } });
    if (foundUser) throw new ApiError(409, ErrorMessage.USER_EXISTS);

    const hashedPassword = await hash(password, 10);
    const user = await prisma.user.create({
      data: { email, password: hashedPassword, role },
    });

    const accessToken = sign({ userId: user.id, role: user.role }, ACCESS_TOKEN_KEY, {
      expiresIn: 30,
    });
    const refreshToken = sign({ userId: user.id }, REFRESH_TOKEN_KEY, { expiresIn: '1d' });

    res.cookie('jwt', refreshToken, {
      httpOnly: true,
      sameSite: 'none',
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.status(201).json({ accessToken, role: user.role });
  } catch (error) {
    next(error);
  }
};

const login = async (req: Request, res: Response, next: NextFunction) => {
  try {
    UserLoginSchema.parse(req.body);
    const { email, password } = req.body;

    const user = await prisma.user.findFirst({ where: { email } });
    if (!user) throw new ApiError(400, ErrorMessage.CREDENTIALS);

    const match = await compare(password, user.password);
    if (!match) throw new ApiError(400, ErrorMessage.CREDENTIALS);

    const accessToken = sign({ userId: user.id, role: user.role }, ACCESS_TOKEN_KEY, {
      expiresIn: 30,
    });
    const refreshToken = sign({ userId: user.id }, REFRESH_TOKEN_KEY, { expiresIn: '1d' });

    res.cookie('jwt', refreshToken, {
      httpOnly: true,
      sameSite: 'none',
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.status(200).json({ accessToken, role: user.role });
  } catch (error) {
    next(error);
  }
};

const logout = async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (!req.cookies.jwt) {
      res.sendStatus(204);
      return;
    }
    res.clearCookie('jwt', { httpOnly: true, sameSite: 'none' });
    res.json({ message: 'Cookie cleared' });
  } catch (error) {
    next(error);
  }
};

const refresh = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const refreshToken = req.cookies.jwt;
    if (!refreshToken) throw new ApiError(401, ErrorMessage.UNAUTHORIZED);

    const payload = verify(refreshToken, REFRESH_TOKEN_KEY) as { userId: string };
    const user = await prisma.user.findFirst({ where: { id: payload.userId } });
    if (!user) throw new ApiError(403, ErrorMessage.FORBIDDEN);

    const accessToken = sign({ userId: user.id, role: user.role }, ACCESS_TOKEN_KEY, {
      expiresIn: 30,
    });
    res.json({ accessToken });
  } catch (error) {
    next(error);
  }
};

export { register, login, logout, refresh };
