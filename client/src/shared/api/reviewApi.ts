import baseApi from '@config/baseApi';
import { IProductReview } from '@shared/models/product';

const reviewApi = baseApi
  .enhanceEndpoints({ addTagTypes: ['Reviews'] })
  .injectEndpoints({
    endpoints: (builder) => ({
      createProductReview: builder.mutation<
        IProductReview,
        Omit<IProductReview, 'id' | 'userId'>
      >({
        query: () => ({
          url: 'reviews',
          method: 'POST',
        }),
        invalidatesTags: [{ type: 'Reviews', id: 'LIST' }],
      }),

      getProductReview: builder.query<IProductReview, string>({
        query: (id) => ({
          url: `reviews/${id}`,
          method: 'GET',
        }),
        providesTags: ['Reviews'],
      }),
    }),
  });

export const { useCreateProductReviewMutation, useGetProductReviewQuery } =
  reviewApi;
