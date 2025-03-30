import baseApi from '../../config/baseApi';
import { IProduct } from '../models/product';

const productApi = baseApi
  .enhanceEndpoints({ addTagTypes: ['Products'] })
  .injectEndpoints({
    endpoints: (builder) => ({
      createProduct: builder.mutation<IProduct, Omit<IProduct, 'id'>>({
        query: (data) => ({
          url: 'products',
          method: 'POST',
          body: { ...data },
        }),
        invalidatesTags: [{ type: 'Products', id: 'LIST' }],
      }),

      getProducts: builder.query<IProduct[], void>({
        query: () => ({
          url: 'products',
          method: 'GET',
        }),
        providesTags: (result) =>
          result
            ? [
                ...result.map(({ id }) => ({ type: 'Products', id } as const)),
                { type: 'Products', id: 'LIST' },
              ]
            : [{ type: 'Products', id: 'LIST' }],
      }),

      getProductById: builder.query<IProduct, string>({
        query: (id) => ({
          url: `products/${id}`,
          method: 'GET',
        }),
        providesTags: (__, _, id) => [{ type: 'Products', id }],
      }),

      updateProduct: builder.mutation<IProduct, Partial<IProduct>>({
        query: (data) => {
          const { id, ...body } = data;
          return {
            url: `products/${id}`,
            method: 'PUT',
            body: { ...body },
          };
        },
        invalidatesTags: (__, _, { id }) => [{ type: 'Products', id }],
      }),

      deleteProduct: builder.mutation<void, string>({
        query: (id) => ({
          url: `products/${id}`,
          method: 'DELETE',
        }),
        invalidatesTags: (__, _, id) => [{ type: 'Products', id }],
      }),
    }),
  });

export const {
  useCreateProductMutation,
  useGetProductsQuery,
  useGetProductByIdQuery,
  useUpdateProductMutation,
  useDeleteProductMutation,
} = productApi;
