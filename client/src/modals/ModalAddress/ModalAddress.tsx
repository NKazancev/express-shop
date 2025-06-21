import { FC, useEffect } from 'react';

import {
  useCreateAddressMutation,
  useGetAddressQuery,
  useUpdateAddressMutation,
} from '@shared/api/addressApi';

import { IAddress } from '@shared/models/address';
import HandleAddressForm from '@widgets/User/UserInfo/HandleAddressForm.tsx/HandleAddressForm';

import Modal from '@shared/ui/Modal/Modal';
import usePortal from '@shared/hooks/usePortal';
import { PORTAL_CONTAINER_ID } from '@config/consts';

import xbutton from '@shared/assets/x-button.svg';
import styles from './ModalAddress.module.css';

type TModalAddress = {
  isUpdate: boolean;
  onClose: () => void;
};

const ModalAddress: FC<TModalAddress> = ({ onClose, isUpdate }) => {
  const [createAddress, { isSuccess: created }] = useCreateAddressMutation();
  const [updateAddress, { isSuccess: updated }] = useUpdateAddressMutation();
  const { data: address, refetch } = useGetAddressQuery();

  const handleAddress = async (data: Omit<IAddress, 'id'>) => {
    try {
      if (!isUpdate) {
        await createAddress({ ...data }).unwrap();
      }
      if (isUpdate && address) {
        await updateAddress({ id: address.id, ...data }).unwrap();
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (created || updated) {
      onClose();
      refetch();
    }
  }, [created, updated]);

  const content = (
    <Modal onClose={onClose}>
      <div className={styles.content}>
        <h3 className={styles.title}>
          {!isUpdate ? 'Add address' : 'Update address'}
        </h3>

        {!address && (
          <HandleAddressForm
            handleAddress={handleAddress}
            isUpdate={isUpdate}
          />
        )}
        {address && (
          <HandleAddressForm
            handleAddress={handleAddress}
            isUpdate={isUpdate}
            address={address}
          />
        )}
        <button type="button" onClick={onClose} className={styles.button}>
          <img src={xbutton} />
        </button>
      </div>
    </Modal>
  );

  const modal = usePortal(PORTAL_CONTAINER_ID, content);

  return modal;
};

export default ModalAddress;
