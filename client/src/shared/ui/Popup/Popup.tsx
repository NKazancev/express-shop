import { FC, ReactNode, useEffect, useRef } from 'react';

import styles from './Popup.module.css';

type TPopup = {
  children: ReactNode;
  onClose: () => void;
};

const Popup: FC<TPopup> = ({ children, onClose }) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (
        e.target instanceof HTMLElement &&
        !ref.current?.parentNode?.contains(e.target)
      ) {
        onClose();
      }
    };

    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  return (
    <div ref={ref} className={styles.container}>
      {children}
    </div>
  );
};

export default Popup;
