import { z } from 'zod';

const UserRegistrationSchema = z.object({
  email: z.string().email(),
  password: z.string().min(5),
});

const UserLoginSchema = z.object({
  email: z.string().nonempty(),
  password: z.string().nonempty(),
});

export { UserRegistrationSchema, UserLoginSchema };
