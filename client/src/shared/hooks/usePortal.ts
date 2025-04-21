import { ReactNode, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

const usePortal = (id: string, children: ReactNode) => {
  const [container, setContainer] = useState<HTMLDivElement>();

  useEffect(() => {
    const element = document.getElementById(id) as HTMLDivElement;
    if (!element) throw new Error('Container for portal not found!');
    setContainer(element);
  }, [id]);

  return container ? createPortal(children, container) : null;
};

export default usePortal;
