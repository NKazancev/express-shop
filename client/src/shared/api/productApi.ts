import baseApi from '@config/baseApi';
import {
  IProductsResponse,
  IProductsRequest,
  TUpdateProductData,
  TProductData,
} from '@shared/models/product';

const productApi = baseApi
  .enhanceEndpoints({ addTagTypes: ['Products'] })
  .injectEndpoints({
    endpoints: (builder) => ({
      createProduct: builder.mutation<{ message: string }, FormData>({
        query: (data) => ({
          url: 'products',
          method: 'POST',
          body: data,
        }),
        invalidatesTags: [{ type: 'Products', id: 'LIST' }],
      }),

      getProducts: builder.query<IProductsResponse, IProductsRequest>({
        query: (args) => {
          return {
            url: 'products',
            method: 'GET',
            params: { ...args },
          };
        },
        providesTags: (result) =>
          result
            ? [
                ...result.data.map(
                  ({ id }) => ({ type: 'Products', id } as const)
                ),
                { type: 'Products', id: 'LIST' },
              ]
            : [{ type: 'Products', id: 'LIST' }],
      }),

      getProductById: builder.query<TProductData, string | undefined>({
        query: (id) => ({
          url: `products/${id}`,
          method: 'GET',
        }),
        providesTags: (__, _, id) => [{ type: 'Products', id }],
      }),

      updateProduct: builder.mutation<
        { message: string },
        TUpdateProductData & { id: string }
      >({
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

      updateProductGallery: builder.mutation<{ message: string }, FormData>({
        query: (data) => {
          return {
            url: `products/gallery`,
            method: 'POST',
            body: data,
          };
        },
        invalidatesTags: ['Products'],
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
  useLazyGetProductByIdQuery,
  useUpdateProductMutation,
  useUpdateProductGalleryMutation,
  useDeleteProductMutation,
} = productApi;
