import { compare, hash } from 'bcrypt';

import { OrderStatus, Role } from '@prisma/client';
import prisma from '../config/prismaClient';
import TokenService from './tokenService';
import ApiError from '../error/ApiError';
import ErrorMessage from '../error/errorMessage';
import AddressService from './addressService';

class UserService {
  static async createUsername(email: string) {
    const arr = email.split('@');
    const username = arr[0] + String(Math.random()).slice(2, 6) + arr[1][0];
    return username;
  }

  static async createUser(email: string, password: string, role: Role) {
    const foundUser = await prisma.user.findFirst({ where: { email } });
    if (foundUser) throw new ApiError(409, ErrorMessage.USER_EXISTS);

    const hashedPassword = await hash(password, 10);
    const username = await UserService.createUsername(email);

    const user = await prisma.user.create({
      data: { email, password: hashedPassword, username, role },
    });

    const { accessToken, refreshToken } = TokenService.createTokens(
      user.id,
      user.role
    );
    return { user, accessToken, refreshToken };
  }

  static async getUserCart(userId: string) {
    const user = await prisma.user.findFirst({
      where: { id: userId },
      select: { username: true, cartProducts: { select: { quantity: true } } },
    });
    return user;
  }

  static async getUserInfo(userId: string) {
    const info = await prisma.user.findFirst({
      where: { id: userId },
      select: {
        email: true,
        username: true,
        address: { omit: { id: true, userId: true } },
      },
    });
    let stringAddress;
    if (info?.address) {
      const { countryId, cityId, street, postcode } = info.address;
      stringAddress = await AddressService.createStringAddress(
        countryId,
        cityId,
        street,
        postcode
      );
    }
    return { ...info, stringAddress };
  }

  static async changePassword(
    userId: string,
    oldPassword: string,
    newPassword: string
  ) {
    const foundUser = await prisma.user.findFirst({ where: { id: userId } });
    if (!foundUser) throw new ApiError(403, ErrorMessage.FORBIDDEN);

    const foundPassword = await compare(oldPassword, foundUser.password);
    if (!foundPassword) throw new ApiError(400, ErrorMessage.CREDENTIALS);

    const password = await hash(newPassword, 10);

    return await prisma.user.update({
      where: { id: foundUser.id },
      data: {
        password,
      },
    });
  }

  static async changeUsername(userId: string, username: string) {
    const foundUser = await prisma.user.findFirst({ where: { id: userId } });
    if (!foundUser) throw new ApiError(403, ErrorMessage.FORBIDDEN);

    const foundName = await prisma.user.findFirst({ where: { username } });
    if (foundName) throw new ApiError(409, ErrorMessage.USERNAME_EXISTS);

    return await prisma.user.update({
      where: { id: foundUser.id },
      data: { username },
    });
  }

  static async deleteUser(userId: string) {
    return await prisma.$transaction(async (tx) => {
      await tx.cartProduct.deleteMany({ where: { userId } });
      await tx.productReview.deleteMany({ where: { userId } });

      const userAddress = await tx.address.findFirst({ where: { userId } });
      if (userAddress) await tx.address.delete({ where: { userId } });

      const undeliveredOrder = await prisma.order.findFirst({
        where: {
          userId,
          status: {
            in: [
              OrderStatus.PENDING,
              OrderStatus.ACCEPTED,
              OrderStatus.OUT_FOR_DELIVERY,
            ],
          },
        },
      });
      if (undeliveredOrder) {
        throw new ApiError(409, ErrorMessage.UNDELIVERED_ORDERS);
      } else {
        await tx.order.deleteMany({ where: { userId } });
      }

      await tx.user.delete({ where: { id: userId } });
    });
  }
}

export default UserService;
