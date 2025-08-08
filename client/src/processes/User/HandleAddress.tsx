import { Dispatch, FC, SetStateAction, useEffect, useState } from 'react';
import toast from 'react-hot-toast';

import baseApi from '@config/baseApi';
import { isErrorWithMessage, isFetchBaseQueryError } from '@config/error';

import { useAppDispatch } from '@shared/hooks/reduxHooks';
import { IAddress } from '@shared/models/address';
import {
  useCreateAddressMutation,
  useGetAddressQuery,
  useUpdateAddressMutation,
} from '@shared/api/addressApi';

import HandleAddressForm from '@widgets/User/UserInfo/HandleAddressForm.tsx/HandleAddressForm';

type THandleAddress = {
  setIsSuccess: Dispatch<SetStateAction<boolean>>;
  isUpdate: boolean;
};

const HandleAddress: FC<THandleAddress> = ({ setIsSuccess, isUpdate }) => {
  const [createAddress, { isSuccess: created }] = useCreateAddressMutation();
  const [updateAddress, { isSuccess: updated }] = useUpdateAddressMutation();

  const { data: address, refetch } = useGetAddressQuery();
  const dispatch = useAppDispatch();

  const [error, setError] = useState<string>();

  const handleAddress = async (data: Omit<IAddress, 'id'>) => {
    try {
      if (!isUpdate) {
        await createAddress({ ...data }).unwrap();
      }
      if (isUpdate && address) {
        await updateAddress({ id: address.id, ...data }).unwrap();
      }
      dispatch(baseApi.util.invalidateTags(['Users']));
    } catch (error) {
      if (isFetchBaseQueryError(error)) {
        const errorMessage = (error.data as { message: string }).message;
        setError(errorMessage);
      } else if (isErrorWithMessage(error)) {
        toast.error(error.message);
      }
    }
  };

  useEffect(() => {
    if (created || updated) {
      setIsSuccess(true);
      refetch();
    }
  }, [created, updated]);

  return (
    <>
      {!address && (
        <HandleAddressForm
          handleAddress={handleAddress}
          isUpdate={isUpdate}
          apiError={error}
        />
      )}
      {address && (
        <HandleAddressForm
          handleAddress={handleAddress}
          isUpdate={isUpdate}
          address={address}
          apiError={error}
        />
      )}
    </>
  );
};

export default HandleAddress;
