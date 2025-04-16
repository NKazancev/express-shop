import baseApi from '../../config/baseApi';
import { IProductBrand } from '../models/product';

const brandApi = baseApi
  .enhanceEndpoints({ addTagTypes: ['Brands'] })
  .injectEndpoints({
    endpoints: (builder) => ({
      createBrand: builder.mutation<IProductBrand, string>({
        query: (name) => ({
          url: 'brands',
          method: 'POST',
          body: { name },
        }),
        invalidatesTags: [{ type: 'Brands', id: 'LIST' }],
      }),

      getBrands: builder.query<IProductBrand[], void>({
        query: () => ({
          url: 'brands',
          method: 'GET',
        }),
        transformResponse: (response: IProductBrand[]) => {
          const sortedBrands = response.sort((a, b) =>
            a.name.localeCompare(b.name)
          );
          return sortedBrands;
        },
        providesTags: (result) =>
          result
            ? [
                ...result.map(({ id }) => ({ type: 'Brands', id } as const)),
                { type: 'Brands', id: 'LIST' },
              ]
            : [{ type: 'Brands', id: 'LIST' }],
      }),

      deleteBrand: builder.mutation<void, string>({
        query: (id) => ({
          url: `brands/${id}`,
          method: 'DELETE',
        }),
        invalidatesTags: (_, __, id) => [{ type: 'Brands', id }],
      }),
    }),
  });

export const {
  useCreateBrandMutation,
  useGetBrandsQuery,
  useLazyGetBrandsQuery,
  useDeleteBrandMutation,
} = brandApi;
