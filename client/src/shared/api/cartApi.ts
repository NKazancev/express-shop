import baseApi from '@config/baseApi';
import { ICartProduct } from '@shared/models/cart';

const cartApi = baseApi
  .enhanceEndpoints({ addTagTypes: ['Cart'] })
  .injectEndpoints({
    endpoints: (builder) => ({
      createCartProduct: builder.mutation<
        { message: string },
        Pick<ICartProduct, 'quantity'> & { productId: string }
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
        { message: string },
        Pick<ICartProduct, 'id' | 'quantity'>
      >({
        query: (args) => {
          const { id, quantity } = args;
          return {
            url: `cart/${id}`,
            method: 'PUT',
            body: { quantity },
          };
        },
        invalidatesTags: [{ type: 'Cart', id: 'LIST' }],
      }),

      deleteCartProduct: builder.mutation({
        query: (id) => ({
          url: `cart/${id}`,
          method: 'DELETE',
        }),
        invalidatesTags: [{ type: 'Cart', id: 'LIST' }],
      }),
    }),
  });

export const {
  useCreateCartProductMutation,
  useGetCartProductsQuery,
  useUpdateCartProductMutation,
  useDeleteCartProductMutation,
} = cartApi;
