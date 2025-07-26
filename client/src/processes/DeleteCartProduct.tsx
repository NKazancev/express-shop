import { FC } from 'react';
import toast from 'react-hot-toast';

import { useDeleteCartProductMutation } from '@shared/api/cartApi';
import { isErrorWithMessage, isFetchBaseQueryError } from '@config/error';

import xbutton from '@shared/assets/x-button.svg';

type TDeleteCartProduct = {
  productId: string;
};

const DeleteCartProduct: FC<TDeleteCartProduct> = (props) => {
  const { productId } = props;

  const [deleteCartProduct] = useDeleteCartProductMutation();

  const handleDelete = async () => {
    try {
      await deleteCartProduct(productId).unwrap();
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
    <button type="button" onClick={handleDelete}>
      <img src={xbutton} alt="x" width={10} />
    </button>
  );
};

export default DeleteCartProduct;
