import { ReactNode, FC, useEffect, useRef } from 'react';

import styles from './Dropdown.module.css';

type TDropdown = {
  children: ReactNode;
  isVisible: boolean;
  onClose: () => void;
};

const Dropdown: FC<TDropdown> = ({ children, isVisible, onClose }) => {
  const ref = useRef<HTMLDivElement>(null);
  const dropdownClass = isVisible ? styles.visible : styles.hidden;

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
  }, [ref, onClose]);

  return (
    <div ref={ref} className={dropdownClass}>
      {children}
    </div>
  );
};

export default Dropdown;
