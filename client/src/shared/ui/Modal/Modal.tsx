import { FC, ReactNode, useEffect, useRef } from 'react';

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
  }, [ref, onClose]);

  return (
    <div className={styles.overlay}>
      <div ref={ref} className={styles.container}>
        {children}
      </div>
    </div>
  );
};

export default Modal;
