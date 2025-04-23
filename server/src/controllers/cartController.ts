import { Request, Response } from 'express';

import CartService from '../services/cartService';
import {
  CreateCartProductSchema,
  UpdateCartProductSchema,
} from '../schema/cartSchema';

class CartController {
  static async createCartProduct(req: Request, res: Response) {
    CreateCartProductSchema.parse(req.body);
    const { quantity, productId } = req.body;
    const userId = req.user.id;
    const cartProduct = await CartService.createCartProduct(
      quantity,
      productId,
      userId
    );
    res.status(201).json(cartProduct);
  }

  static async getCartProducts(req: Request, res: Response) {
    const userId = req.user.id;
    const cartProducts = await CartService.getCartProducts(userId);
    res.status(200).json(cartProducts);
  }

  static async updateCartProduct(req: Request, res: Response) {
    UpdateCartProductSchema.parse(req.body);
    const { quantity } = req.body;
    const cartProductId = req.params.id;
    const userId = req.user.id;
    const updatedCartProduct = await CartService.updateCartProduct(
      quantity,
      cartProductId,
      userId
    );
    res.status(200).json(updatedCartProduct);
  }

  static async deleteCartProduct(req: Request, res: Response) {
    const cartProductId = req.params.id;
    const userId = req.user.id;
    await CartService.deleteCartProduct(cartProductId, userId);
    res.status(204).json();
  }
}

export default CartController;
