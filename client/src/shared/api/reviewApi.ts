import baseApi from '@config/baseApi';
import {
  IProductReview,
  IUserReview,
  TCreateReviewData,
} from '@shared/models/review';

const reviewApi = baseApi
  .enhanceEndpoints({ addTagTypes: ['Reviews'] })
  .injectEndpoints({
    endpoints: (builder) => ({
      createProductReview: builder.mutation<
        { message: string },
        TCreateReviewData
      >({
        query: (data) => ({
          url: 'reviews',
          method: 'POST',
          body: data,
        }),
        invalidatesTags: [{ type: 'Reviews', id: 'LIST' }],
      }),

      getAllUserReviews: builder.query<IUserReview[], void>({
        query: () => ({
          url: 'reviews',
          method: 'GET',
        }),
        providesTags: (result) =>
          result
            ? [
                ...result.map(({ id }) => ({ type: 'Reviews', id } as const)),
                { type: 'Reviews', id: 'LIST' },
              ]
            : [{ type: 'Reviews', id: 'LIST' }],
      }),

      getUserReview: builder.query<IProductReview, string | undefined>({
        query: (id) => ({
          url: `reviews/${id}`,
          method: 'GET',
        }),
        providesTags: ['Reviews'],
      }),

      deleteReview: builder.mutation<void, string>({
        query: (id) => ({
          url: `reviews/${id}`,
          method: 'DELETE',
        }),
        invalidatesTags: (_, __, id) => [{ type: 'Reviews', id }],
      }),
    }),
  });

export const {
  useCreateProductReviewMutation,
  useGetAllUserReviewsQuery,
  useLazyGetUserReviewQuery,
  useDeleteReviewMutation,
} = reviewApi;
