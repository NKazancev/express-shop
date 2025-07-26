import { FC } from 'react';
import toast from 'react-hot-toast';

import { isErrorWithMessage, isFetchBaseQueryError } from '@config/error';

import { useDeleteCountryMutation } from '@shared/api/countryApi';
import xbutton from '@shared/assets/x-button.svg';

type TDeleteDeliveryCountry = {
  countryId: string;
};

const DeleteDeliveryCountry: FC<TDeleteDeliveryCountry> = (props) => {
  const { countryId } = props;

  const [deleteCountry] = useDeleteCountryMutation();

  const handleDelete = async () => {
    try {
      await deleteCountry(countryId).unwrap();
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

export default DeleteDeliveryCountry;
