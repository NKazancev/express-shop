import { z } from 'zod';

const CreateAddressSchema = z.object({
  countryId: z.string(),
  cityId: z.string(),
  street: z.string(),
  postcode: z.string(),
});

export default CreateAddressSchema;
