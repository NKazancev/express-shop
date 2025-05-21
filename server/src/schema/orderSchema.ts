import { z } from 'zod';

const CreateOrderSchema = z.object({
  firstName: z.string(),
  lastName: z.string(),
  email: z.string(),
  phone: z.string(),
  country: z.string(),
  city: z.string(),
  street: z.string(),
  postcode: z.string(),
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
