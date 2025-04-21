import { FC, ReactNode, useEffect, useRef } from 'react';

import usePortal from '@shared/hooks/usePortal';
import { PORTAL_CONTAINER_ID } from '@config/consts';

import styles from './Modal.module.css';

type TModal = {
  children: ReactNode;
  onClose: () => void;
};

const Modal: FC<TModal> = ({ children, onClose }) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleOverlayClick = (e: MouseEvent) => {
      if (
        e.target instanceof HTMLElement &&
        !ref.current?.firstElementChild?.contains(e.target)
      ) {
        onClose();
      }
    };

    document.addEventListener('mousedown', handleOverlayClick);
    return () => document.removeEventListener('mousedown', handleOverlayClick);
  }, [onClose]);

  const content = (
    <div className={styles.overlay}>
      <div ref={ref}>{children}</div>
    </div>
  );

  const portal = usePortal(PORTAL_CONTAINER_ID, content);
  return portal;
};

export default Modal;
