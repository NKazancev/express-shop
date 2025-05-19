import baseApi from '@config/baseApi';
import { ICity } from '@shared/models/country';

const cityApi = baseApi
  .enhanceEndpoints({ addTagTypes: ['Cities'] })
  .injectEndpoints({
    endpoints: (builder) => ({
      createCity: builder.mutation<ICity, Pick<ICity, 'name' | 'countryId'>>({
        query: ({ name, countryId }) => ({
          url: 'cities',
          method: 'POST',
          body: { name, countryId },
        }),
        invalidatesTags: [{ type: 'Cities', id: 'LIST' }],
      }),

      getAllCitiesByCountryId: builder.query<ICity[], string>({
        query: (countryId) => ({
          url: `cities?countryId=${countryId}`,
          method: 'GET',
        }),
        providesTags: (_, __, countryId) => [{ type: 'Cities', id: countryId }],
      }),

      deleteCity: builder.mutation<void, string>({
        query: (id) => ({
          url: `cities/${id}`,
          method: 'DELETE',
        }),
        invalidatesTags: (_, __, id) => [{ type: 'Cities', id }],
      }),
    }),
  });

export const {
  useCreateCityMutation,
  useLazyGetAllCitiesByCountryIdQuery,
  useDeleteCityMutation,
} = cityApi;
