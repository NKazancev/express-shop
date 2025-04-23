import { z } from 'zod';

export const CreateCartProductSchema = z.object({
  quantity: z.number(),
  productId: z.string(),
});

export const UpdateCartProductSchema = z.object({
  quantity: z.number(),
});
