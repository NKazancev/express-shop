import baseApi from '@config/baseApi';
import { ICartProduct } from '@shared/models/cart';

const cartApi = baseApi
  .enhanceEndpoints({ addTagTypes: ['Cart'] })
  .injectEndpoints({
    endpoints: (builder) => ({
      createCartProduct: builder.mutation<
        ICartProduct,
        Pick<ICartProduct, 'quantity' | 'productId'>
      >({
        query: (data) => ({
          url: 'cart',
          method: 'POST',
          body: data,
        }),
        async onQueryStarted(_, { dispatch, queryFulfilled }) {
          try {
            await queryFulfilled;
            dispatch(baseApi.util.invalidateTags(['Users']));
          } catch (error) {
            console.log(error);
          }
        },
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
          const { id, quantity } = args;
          return {
            url: `cart/${id}`,
            method: 'PUT',
            body: { quantity },
          };
        },
        async onQueryStarted(_, { dispatch, queryFulfilled }) {
          try {
            await queryFulfilled;
            dispatch(baseApi.util.invalidateTags(['Users']));
          } catch (error) {
            console.log(error);
          }
        },
        invalidatesTags: [{ type: 'Cart', id: 'LIST' }],
      }),

      deleteCartProduct: builder.mutation({
        query: (id) => ({
          url: `cart/${id}`,
          method: 'DELETE',
        }),
        async onQueryStarted(_, { dispatch, queryFulfilled }) {
          try {
            await queryFulfilled;
            dispatch(baseApi.util.invalidateTags(['Users']));
          } catch (error) {
            console.log(error);
          }
        },
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
