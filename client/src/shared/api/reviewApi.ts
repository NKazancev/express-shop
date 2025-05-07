import baseApi from '@config/baseApi';
import { ICreateReviewData, IProductReview } from '@shared/models/product';

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

      getProductReview: builder.query<IProductReview, string | undefined>({
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
