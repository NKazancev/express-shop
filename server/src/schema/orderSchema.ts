import { z } from 'zod';

const CreateOrderSchema = z.object({
  customer: z.string(),
  address: z.string(),
});

const UpdateOrderStatusSchema = z.object({
  status: z.enum([
    'PENDING',
    'ACCEPTED',
    'OUT_FOR_DELIVERY',
    'DELIVERED',
    'CANCELLED',
  ]),
});

export { CreateOrderSchema, UpdateOrderStatusSchema };
