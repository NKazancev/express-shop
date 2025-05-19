import baseApi from '@config/baseApi';
import { ICountry } from '@shared/models/country';

const countryApi = baseApi
  .enhanceEndpoints({ addTagTypes: ['Countries'] })
  .injectEndpoints({
    endpoints: (builder) => ({
      createCountry: builder.mutation<ICountry, string>({
        query: (name) => ({
          url: 'countries',
          method: 'POST',
          body: { name },
        }),
        invalidatesTags: [{ type: 'Countries', id: 'LIST' }],
      }),

      getCountries: builder.query<ICountry[], void>({
        query: () => ({
          url: 'countries',
          method: 'GET',
        }),
        transformResponse: (response: ICountry[]) => {
          const sortedCountries = response.sort((a, b) =>
            a.name.localeCompare(b.name)
          );
          return sortedCountries;
        },
        providesTags: (result) =>
          result
            ? [
                ...result.map(({ id }) => ({ type: 'Countries', id } as const)),
                { type: 'Countries', id: 'LIST' },
              ]
            : [{ type: 'Countries', id: 'LIST' }],
      }),

      deleteCountry: builder.mutation<void, string>({
        query: (id) => ({
          url: `countries/${id}`,
          method: 'DELETE',
        }),
        invalidatesTags: (_, __, id) => [{ type: 'Countries', id }],
      }),
    }),
  });

export const {
  useCreateCountryMutation,
  useGetCountriesQuery,
  useDeleteCountryMutation,
} = countryApi;
