import { FC, useEffect, useState } from 'react';
import toast from 'react-hot-toast';

import { isErrorWithMessage, isFetchBaseQueryError } from '@config/error';

import { useDeleteProductMutation } from '@shared/api/productApi';
import Confirmation from '@shared/ui/Confirmation/Confirmation';

import xbutton from '@shared/assets/x-button.svg';

type TDeleteProduct = {
  productId: string;
};

const DeleteProduct: FC<TDeleteProduct> = ({ productId }) => {
  const [deleteProduct, { isSuccess }] = useDeleteProductMutation();

  const [confirmationVisible, setConfirmationVisible] = useState<boolean>();
  const showConfirmation = () => setConfirmationVisible(true);
  const hideConfirmation = () => setConfirmationVisible(false);

  useEffect(() => {
    if (isSuccess) {
      toast.success('Successfully deleted');
    }
  }, [isSuccess, toast]);

  const handleDelete = async () => {
    try {
      await deleteProduct(productId).unwrap();
    } catch (error) {
      hideConfirmation();
      if (isFetchBaseQueryError(error)) {
        const errorMessage = (error.data as { message: string }).message;
        toast.error(errorMessage);
      } else if (isErrorWithMessage(error)) {
        toast.error(error.message);
      }
    }
  };

  return (
    <>
      <button type="button" onClick={showConfirmation}>
        <img src={xbutton} alt="delete-icon" width={12} />
      </button>

      {confirmationVisible && (
        <Confirmation
          text={'Are you sure you want to delete this product?'}
          onAgree={handleDelete}
          onClose={hideConfirmation}
        />
      )}
    </>
  );
};

export default DeleteProduct;
