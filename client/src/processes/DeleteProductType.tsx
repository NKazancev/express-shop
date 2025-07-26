import { FC } from 'react';
import toast from 'react-hot-toast';

import { isErrorWithMessage, isFetchBaseQueryError } from '@config/error';
import { useDeleteTypeMutation } from '@shared/api/typeApi';

import xbutton from '@shared/assets/x-button.svg';

type TDeleteProductType = {
  typeId: string;
};

const DeleteProductType: FC<TDeleteProductType> = (props) => {
  const { typeId } = props;

  const [deleteType] = useDeleteTypeMutation();

  const handleDelete = async () => {
    try {
      await deleteType(typeId).unwrap();
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

export default DeleteProductType;
