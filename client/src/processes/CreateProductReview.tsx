import { Dispatch, FC, SetStateAction, useEffect, useState } from 'react';
import toast from 'react-hot-toast';

import { isErrorWithMessage, isFetchBaseQueryError } from '@config/error';

import { ICreateReviewData } from '@shared/models/review';
import { useCreateProductReviewMutation } from '@shared/api/reviewApi';
import { useLazyGetProductByIdQuery } from '@shared/api/productApi';

import ReviewForm from '@widgets/Product/ProductReviews/ReviewForm/ReviewForm';

type TCreateProductReview = {
  productId?: string;
  setIsSuccess: Dispatch<SetStateAction<boolean>>;
};

const CreateProductReview: FC<TCreateProductReview> = (props) => {
  const { productId, setIsSuccess } = props;

  const [createProductReview, { isSuccess }] = useCreateProductReviewMutation();
  const [trigger] = useLazyGetProductByIdQuery();

  const [error, setError] = useState<string>();

  useEffect(() => {
    if (isSuccess && productId) {
      setIsSuccess(true);
      trigger(productId);
    }
  }, [isSuccess]);

  const handleReviewCreation = async (data: ICreateReviewData) => {
    try {
      await createProductReview({ ...data, productId }).unwrap();
    } catch (error) {
      if (isFetchBaseQueryError(error)) {
        const errorMessage = (error.data as { message: string }).message;
        setError(errorMessage);
      } else if (isErrorWithMessage(error)) {
        toast.error(error.message);
      }
    }
  };

  return (
    <ReviewForm onReviewCreation={handleReviewCreation} apiError={error} />
  );
};

export default CreateProductReview;
