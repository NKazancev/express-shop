import baseApi from '../../config/baseApi';
import { IProductType } from '../models/product';

const productTypeApi = baseApi
  .enhanceEndpoints({ addTagTypes: ['ProductTypes'] })
  .injectEndpoints({
    endpoints: (builder) => ({
      createType: builder.mutation<IProductType, string>({
        query: (name) => ({
          url: 'types',
          method: 'POST',
          body: name,
        }),
        invalidatesTags: [{ type: 'ProductTypes', id: 'LIST' }],
      }),

      getTypes: builder.query<IProductType[], void>({
        query: () => ({
          url: 'types',
          method: 'GET',
        }),
        providesTags: (result) =>
          result
            ? [
                ...result.map(
                  ({ id }) => ({ type: 'ProductTypes', id } as const)
                ),
                { type: 'ProductTypes', id: 'LIST' },
              ]
            : [{ type: 'ProductTypes', id: 'LIST' }],
      }),

      updateType: builder.mutation<IProductType, Partial<IProductType>>({
        query: (data) => {
          const { id, name } = data;
          return {
            url: `types/${id}`,
            method: 'PUT',
            body: name,
          };
        },
        invalidatesTags: (_, __, { id }) => [{ type: 'ProductTypes', id }],
      }),

      deleteType: builder.mutation<void, string>({
        query: (id) => ({
          url: `types/${id}`,
          method: 'DELETE',
        }),
        invalidatesTags: (_, __, id) => [{ type: 'ProductTypes', id }],
      }),
    }),
  });

export const {
  useCreateTypeMutation,
  useGetTypesQuery,
  useUpdateTypeMutation,
  useDeleteTypeMutation,
} = productTypeApi;
