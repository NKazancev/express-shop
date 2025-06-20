import { FC, useEffect } from 'react';

import { useCreateAddressMutation } from '@shared/api/addressApi';
import { IAddress } from '@shared/models/address';
import HandleAddressForm from '@widgets/User/UserInfo/ChangeAddressForm/HandleAddressForm';

import Modal from '@shared/ui/Modal/Modal';
import usePortal from '@shared/hooks/usePortal';
import { PORTAL_CONTAINER_ID } from '@config/consts';

import xbutton from '@shared/assets/x-button.svg';
import styles from './ModalAddress.module.css';

type TModalAddress = {
  onClose: () => void;
};

const ModalAddress: FC<TModalAddress> = ({ onClose }) => {
  const [createAddress, { isSuccess }] = useCreateAddressMutation();

  const handleAddressChange = async (data: Omit<IAddress, 'id'>) => {
    console.log(data);
    try {
      await createAddress({ ...data }).unwrap();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (isSuccess) onClose();
  }, [isSuccess]);

  const content = (
    <Modal onClose={onClose}>
      <div className={styles.content}>
        <h3 className={styles.title}>Create address</h3>

        <HandleAddressForm handleAddressChange={handleAddressChange} />

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
