import { FC } from 'react';
import toast from 'react-hot-toast';

import { isErrorWithMessage, isFetchBaseQueryError } from '@config/error';

import { useDeleteReviewMutation } from '@shared/api/reviewApi';

import xbutton from '@shared/assets/x-button.svg';

type TDeleteProductReview = {
  reviewId: string;
};

const DeleteProductReview: FC<TDeleteProductReview> = (props) => {
  const { reviewId } = props;

  const [deleteReview] = useDeleteReviewMutation();

  const handleReviewDelete = async () => {
    try {
      await deleteReview(reviewId).unwrap();
    } catch (error) {
      if (isFetchBaseQueryError(error)) {
        const errorMessage = (error.data as { message: string }).message;
        toast.error(errorMessage);
      } else if (isErrorWithMessage(error)) {
        toast.error(error.message);
      }
    }
  };

  return (
    <button
      type="button"
      onClick={handleReviewDelete}
      style={{ position: 'absolute', top: '20px', right: '20px' }}
    >
      <img src={xbutton} alt="x" width={13} />
    </button>
  );
};

export default DeleteProductReview;
