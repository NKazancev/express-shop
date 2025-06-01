import { z } from 'zod';

const CreateProductSchema = z.object({
  name: z.string(),
  price: z.number(),
  description: z.string(),
  typeId: z.string(),
  brandId: z.string(),
  text: z.string(),
});

const ProductTypeSchema = z.object({
  name: z.string(),
});

const ProductBrandSchema = z.object({
  name: z.string(),
});

const ProductReviewSchema = z.object({
  title: z.string(),
  text: z.string(),
  rate: z.number(),
  productId: z.string(),
});

export {
  CreateProductSchema,
  ProductTypeSchema,
  ProductBrandSchema,
  ProductReviewSchema,
};
