import { z } from 'zod';

const LoginUserSchema = z.object({
  email: z.string().nonempty(),
  password: z.string().nonempty(),
});

export { LoginUserSchema };
