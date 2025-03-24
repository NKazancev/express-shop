import { z } from 'zod';

const CreateProductSchema = z.object({
  name: z.string(),
  price: z.number(),
  description: z.string(),
});

const UpdateProductSchema = z.object({
  name: z.string().optional(),
  price: z.number().optional(),
  description: z.string().optional(),
});

export { CreateProductSchema, UpdateProductSchema };
