import baseApi from '@config/baseApi';
import { ICreateOrderData, IOrder, IOrderProduct } from '@shared/models/order';

const orderApi = baseApi
  .enhanceEndpoints({ addTagTypes: ['Orders'] })
  .injectEndpoints({
    endpoints: (builder) => ({
      createOrder: builder.mutation<IOrder, ICreateOrderData>({
        query: (data) => ({
          url: 'orders',
          method: 'POST',
          body: { ...data },
        }),
        invalidatesTags: [{ type: 'Orders', id: 'LIST' }],
      }),

      getAllOrders: builder.query<IOrder[], void>({
        query: () => ({
          url: 'orders',
          method: 'GET',
        }),
        providesTags: (result) =>
          result
            ? [
                ...result.map(({ id }) => ({ type: 'Orders', id } as const)),
                { type: 'Orders', id: 'LIST' },
              ]
            : [{ type: 'Orders', id: 'LIST' }],
      }),

      getProductsByOrderId: builder.query<IOrderProduct[], string>({
        query: (orderId) => ({
          url: `orders/${orderId}`,
          method: 'GET',
        }),
        providesTags: (_, __, orderId) => [{ type: 'Orders', id: orderId }],
      }),

      updateOrderStatus: builder.mutation<
        IOrder,
        Pick<IOrder, 'id' | 'status'>
      >({
        query: (args) => {
          const { id, status } = args;
          return {
            url: `orders/${id}`,
            method: 'PUT',
            body: { status },
          };
        },
        invalidatesTags: (_, __, { id }) => [{ type: 'Orders', id }],
      }),
    }),
  });

export const {
  useCreateOrderMutation,
  useGetAllOrdersQuery,
  useGetProductsByOrderIdQuery,
  useUpdateOrderStatusMutation,
} = orderApi;
