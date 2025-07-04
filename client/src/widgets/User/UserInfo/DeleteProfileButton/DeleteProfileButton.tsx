import { FC } from 'react';

import styles from './DeleteProfileButton.module.css';

type TDeleteProfileButton = {
  onProfileDelete: () => void;
};

const DeleteProfileButton: FC<TDeleteProfileButton> = ({ onProfileDelete }) => {
  return (
    <button type="button" onClick={onProfileDelete} className={styles.button}>
      <span>Delete profile</span>
    </button>
  );
};

export default DeleteProfileButton;
