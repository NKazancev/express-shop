import { z } from 'zod';

const CreateUserSchema = z.object({
  email: z.string().email(),
  password: z.string().min(5),
  role: z.enum(['USER', 'ADMIN']).optional(),
});

const ChangePasswordSchema = z.object({
  oldPassword: z.string(),
  newPassword: z.string().min(5),
});

export { CreateUserSchema, ChangePasswordSchema };
