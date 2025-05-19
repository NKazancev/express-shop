import { z } from 'zod';

const DeliveryCountrySchema = z.object({
  name: z.string(),
});

const DeliveryCitySchema = z.object({
  name: z.string(),
  countryId: z.string(),
});

export { DeliveryCountrySchema, DeliveryCitySchema };
