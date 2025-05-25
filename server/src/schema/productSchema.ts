import { z } from 'zod';

const CreateProductSchema = z.object({
  name: z.string(),
  price: z.number(),
  description: z.string(),
  typeId: z.string(),
  brandId: z.string(),
  text: z.string(),
});

const UpdateProductSchema = z.object({
  name: z.string().optional(),
  price: z.number().optional(),
  description: z.string().optional(),
  text: z.string().optional(),
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
  UpdateProductSchema,
  ProductTypeSchema,
  ProductBrandSchema,
  ProductReviewSchema,
};
