import baseApi from '@config/baseApi';
import { ICreateReviewData, IProductReview } from '@shared/models/review';

const reviewApi = baseApi
  .enhanceEndpoints({ addTagTypes: ['Reviews'] })
  .injectEndpoints({
    endpoints: (builder) => ({
      createProductReview: builder.mutation<
        IProductReview,
        ICreateReviewData & { productId?: string }
      >({
        query: (data) => ({
          url: 'reviews',
          method: 'POST',
          body: data,
        }),
        invalidatesTags: [{ type: 'Reviews', id: 'LIST' }],
      }),

      getAllUserReviews: builder.query<IProductReview[], void>({
        query: () => ({
          url: `reviews`,
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
    }),
  });

export const {
  useCreateProductReviewMutation,
  useGetAllUserReviewsQuery,
  useLazyGetUserReviewQuery,
} = reviewApi;
