import baseApi from '@config/baseApi';
import { ICartProduct } from '@shared/models/cart';

const cartApi = baseApi
  .enhanceEndpoints({ addTagTypes: ['Cart'] })
  .injectEndpoints({
    endpoints: (builder) => ({
      createCartProduct: builder.mutation<
        ICartProduct,
        { quantity: number; productId: string }
      >({
        query: (data) => ({
          url: 'cart',
          method: 'POST',
          body: data,
        }),
        invalidatesTags: [{ type: 'Cart', id: 'LIST' }],
      }),

      getCartProducts: builder.query<ICartProduct[], void>({
        query: () => ({
          url: 'cart',
          method: 'GET',
        }),
        transformResponse: (response: ICartProduct[]) => {
          const sortedData = response.sort((a, b) =>
            a.product.name.localeCompare(b.product.name)
          );
          return sortedData;
        },
        providesTags: (result) =>
          result
            ? [
                ...result.map(({ id }) => ({ type: 'Cart', id } as const)),
                { type: 'Cart', id: 'LIST' },
              ]
            : [{ type: 'Cart', id: 'LIST' }],
      }),

      updateCartProduct: builder.mutation<
        ICartProduct,
        Pick<ICartProduct, 'id' | 'quantity'>
      >({
        query: (args) => {
          const { id, ...body } = args;
          return {
            url: `cart/${id}`,
            method: 'PUT',
            body: { ...body },
          };
        },
        invalidatesTags: (_, __, { id }) => [{ type: 'Cart', id }],
      }),

      deleteCartProduct: builder.mutation({
        query: (id) => ({
          url: `cart/${id}`,
          method: 'DELETE',
        }),
        invalidatesTags: (_, __, id) => [{ type: 'Cart', id }],
      }),
    }),
  });

export const {
  useCreateCartProductMutation,
  useGetCartProductsQuery,
  useUpdateCartProductMutation,
  useDeleteCartProductMutation,
} = cartApi;
