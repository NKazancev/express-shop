import { FC, useState } from 'react';

import ModalAddress from '@modals/ModalAddress/ModalAddress';

import pen from '@shared/assets/pen-icon.svg';
import styles from './UserAddress.module.css';

type TUserAddress = {
  stringAddress: string | undefined;
};

const UserAddress: FC<TUserAddress> = ({ stringAddress }) => {
  const [modalAddress, setModalAddress] = useState<boolean>(false);
  const [isUpdate, setIsUpdate] = useState<boolean>(false);

  const createAddress = () => {
    setIsUpdate(false);
    setModalAddress(true);
  };

  const updateAddress = () => {
    setIsUpdate(true);
    setModalAddress(true);
  };

  const hideModalAddress = () => setModalAddress(false);

  return (
    <>
      {!stringAddress ? (
        <>
          <button
            type="button"
            onClick={createAddress}
            className={styles.addressButton}
          >
            + add address
          </button>
        </>
      ) : (
        <>
          <span className={styles.address}>{stringAddress}</span>
          <button
            type="button"
            onClick={updateAddress}
            className={styles.button}
          >
            <img src={pen} alt="pen" width={12} />
            <span>change address</span>
          </button>
        </>
      )}

      {modalAddress && (
        <ModalAddress isUpdate={isUpdate} onClose={hideModalAddress} />
      )}
    </>
  );
};

export default UserAddress;
