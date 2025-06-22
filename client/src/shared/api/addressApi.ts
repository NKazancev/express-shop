import baseApi from '@config/baseApi';
import { IAddress } from '@shared/models/address';

const addressApi = baseApi
  .enhanceEndpoints({ addTagTypes: ['Addresses'] })
  .injectEndpoints({
    endpoints: (builder) => ({
      createAddress: builder.mutation<IAddress, Omit<IAddress, 'id'>>({
        query: (data) => ({
          url: 'addresses',
          method: 'POST',
          body: { ...data },
        }),
        async onQueryStarted(_, { dispatch, queryFulfilled }) {
          try {
            await queryFulfilled;
            dispatch(baseApi.util.invalidateTags(['Users']));
          } catch (error) {
            console.log(error);
          }
        },
        invalidatesTags: ['Addresses'],
      }),

      getAddress: builder.query<IAddress, void>({
        query: () => ({
          url: 'addresses',
          method: 'GET',
        }),
        providesTags: ['Addresses'],
      }),

      updateAddress: builder.mutation<IAddress, IAddress & { id: string }>({
        query: (data) => {
          const { id, ...body } = data;
          return {
            url: `addresses/${id}`,
            method: 'PUT',
            body: { ...body },
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
        invalidatesTags: ['Addresses'],
      }),
    }),
  });

export const {
  useCreateAddressMutation,
  useGetAddressQuery,
  useUpdateAddressMutation,
} = addressApi;
