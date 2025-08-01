import { Dispatch, FC, SetStateAction } from 'react';
import toast from 'react-hot-toast';

import { useDeleteCityMutation } from '@shared/api/cityApi';
import { isErrorWithMessage, isFetchBaseQueryError } from '@config/error';

import xbutton from '@shared/assets/x-button.svg';

type TDeleteDeliveryCity = {
  cityId: string;
  setIsSuccess: Dispatch<SetStateAction<boolean>>;
};

const DeleteDeliveryCity: FC<TDeleteDeliveryCity> = (props) => {
  const { cityId, setIsSuccess } = props;

  const [deleteCity] = useDeleteCityMutation();

  const handleDelete = async () => {
    setIsSuccess(false);
    try {
      await deleteCity(cityId).unwrap();
      setIsSuccess(true);
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

export default DeleteDeliveryCity;
