import baseApi from '@config/baseApi';
import {
  ICreateOrderData,
  IOrder,
  IOrderData,
  IOrdersRequest,
  IOrdersResponse,
} from '@shared/models/order';

const orderApi = baseApi
  .enhanceEndpoints({ addTagTypes: ['Orders'] })
  .injectEndpoints({
    endpoints: (builder) => ({
      createOrder: builder.mutation<{ message: string }, ICreateOrderData>({
        query: (data) => ({
          url: 'orders',
          method: 'POST',
          body: { ...data },
        }),
        invalidatesTags: [{ type: 'Orders', id: 'LIST' }],
      }),

      getAllOrders: builder.query<IOrdersResponse<IOrder[]>, IOrdersRequest>({
        query: (args) => ({
          url: 'orders',
          method: 'GET',
          params: { ...args },
        }),
        providesTags: (result) =>
          result
            ? [
                ...result.data.map(
                  ({ id }) => ({ type: 'Orders', id } as const)
                ),
                { type: 'Orders', id: 'LIST' },
              ]
            : [{ type: 'Orders', id: 'LIST' }],
      }),

      getAllUserOrders: builder.query<
        IOrdersResponse<IOrderData[]>,
        IOrdersRequest
      >({
        query: (args) => {
          return {
            url: 'orders/user',
            method: 'GET',
            params: { ...args },
          };
        },
        providesTags: (result) =>
          result
            ? [
                ...result.data.map(
                  ({ id }) => ({ type: 'Orders', id } as const)
                ),
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
        { message: string },
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

      deleteOrder: builder.mutation<void, string>({
        query: (id) => ({
          url: `orders/${id}`,
          method: 'DELETE',
        }),
        invalidatesTags: (_, __, id) => [{ type: 'Orders', id }],
      }),
    }),
  });

export const {
  useCreateOrderMutation,
  useGetAllOrdersQuery,
  useGetAllUserOrdersQuery,
  useGetOrderByIdQuery,
  useUpdateOrderStatusMutation,
  useDeleteOrderMutation,
} = orderApi;
