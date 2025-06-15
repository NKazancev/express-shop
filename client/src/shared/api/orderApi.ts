import baseApi from '@config/baseApi';
import { ICreateOrderData, IOrder, IOrderData } from '@shared/models/order';

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

      getAllUserOrders: builder.query<IOrderData[], void>({
        query: () => ({
          url: 'orders/user',
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

      getOrderById: builder.query<IOrderData, string>({
        query: (id) => ({
          url: `orders/${id}`,
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
  useGetAllUserOrdersQuery,
  useGetOrderByIdQuery,
  useUpdateOrderStatusMutation,
} = orderApi;
