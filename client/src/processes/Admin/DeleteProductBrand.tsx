import { FC } from 'react';
import toast from 'react-hot-toast';

import { isErrorWithMessage, isFetchBaseQueryError } from '@config/error';
import { useDeleteBrandMutation } from '@shared/api/brandApi';

import xbutton from '@shared/assets/x-button.svg';

type TDeleteProductBrand = {
  brandId: string;
};

const DeleteProductBrand: FC<TDeleteProductBrand> = (props) => {
  const { brandId } = props;

  const [deleteBrand] = useDeleteBrandMutation();

  const handleDelete = async () => {
    try {
      await deleteBrand(brandId).unwrap();
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

export default DeleteProductBrand;
