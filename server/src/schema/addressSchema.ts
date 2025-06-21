import { optional, z } from 'zod';

const CreateAddressSchema = z.object({
  countryId: z.string(),
  cityId: z.string(),
  street: z.string(),
  postcode: z.string(),
});

const UpdateAddressSchema = z.object({
  countryId: z.string().optional(),
  cityId: z.string().optional(),
  street: z.string().optional(),
  postcode: z.string().optional(),
});

export { CreateAddressSchema, UpdateAddressSchema };
