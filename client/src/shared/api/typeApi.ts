import baseApi from '../../config/baseApi';
import { IProductType } from '../models/product';

const typeApi = baseApi
  .enhanceEndpoints({ addTagTypes: ['Types'] })
  .injectEndpoints({
    endpoints: (builder) => ({
      createType: builder.mutation<IProductType, string>({
        query: (name) => ({
          url: 'types',
          method: 'POST',
          body: { name },
        }),
        invalidatesTags: [{ type: 'Types', id: 'LIST' }],
      }),

      getTypes: builder.query<IProductType[], void>({
        query: () => ({
          url: 'types',
          method: 'GET',
        }),
        providesTags: (result) =>
          result
            ? [
                ...result.map(({ id }) => ({ type: 'Types', id } as const)),
                { type: 'Types', id: 'LIST' },
              ]
            : [{ type: 'Types', id: 'LIST' }],
      }),

      deleteType: builder.mutation<void, string>({
        query: (id) => ({
          url: `types/${id}`,
          method: 'DELETE',
        }),
        invalidatesTags: (_, __, id) => [{ type: 'Types', id }],
      }),
    }),
  });

export const {
  useCreateTypeMutation,
  useGetTypesQuery,
  useDeleteTypeMutation,
} = typeApi;
