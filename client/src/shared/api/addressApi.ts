import baseApi from '@config/baseApi';
import { IAddress } from '@shared/models/address';

const addressApi = baseApi
  .enhanceEndpoints({ addTagTypes: ['Addresses'] })
  .injectEndpoints({
    endpoints: (builder) => ({
      createAddress: builder.mutation<
        { message: string },
        Omit<IAddress, 'id'>
      >({
        query: (data) => ({
          url: 'addresses',
          method: 'POST',
          body: { ...data },
        }),
        invalidatesTags: ['Addresses'],
      }),

      getAddress: builder.query<IAddress, void>({
        query: () => ({
          url: 'addresses',
          method: 'GET',
        }),
        providesTags: ['Addresses'],
      }),

      updateAddress: builder.mutation<{ message: string }, IAddress>({
        query: (data) => {
          const { id, ...body } = data;
          return {
            url: `addresses/${id}`,
            method: 'PUT',
            body: { ...body },
          };
        },
        invalidatesTags: ['Addresses'],
      }),
    }),
  });

export const {
  useCreateAddressMutation,
  useGetAddressQuery,
  useUpdateAddressMutation,
} = addressApi;
