import { useMemo } from 'react';

const DOTS = '...';

const getRange = (start: number, end: number) => {
  const length = end - start + 1;
  return Array.from({ length }, (_, i) => i + start);
};

const usePagination = (
  currentPage: number,
  itemsQuantity: number,
  itemsPerPage: number
) => {
  const pagination = useMemo(() => {
    const lastPage = Math.ceil(itemsQuantity / itemsPerPage);
    const halfBtns = 2;
    const btns = halfBtns * 2 + 1;

    const leftBtns = Math.max(1, currentPage - halfBtns);
    const rightBtns = Math.min(currentPage + halfBtns, lastPage);

    const leftDotsVisible = leftBtns > halfBtns;
    const rightDotsVisible = rightBtns < lastPage - halfBtns;

    if (lastPage < 11) {
      const range = getRange(1, lastPage);
      const buttons = [...range];
      return { buttons, lastPage };
    }
    if (!leftDotsVisible && rightDotsVisible) {
      const range = getRange(1, btns);
      const buttons = [...range, DOTS, lastPage];
      return { buttons, lastPage };
    }
    if (leftDotsVisible && rightDotsVisible) {
      const range = getRange(leftBtns, rightBtns);
      const buttons = [1, DOTS, ...range, DOTS, lastPage];
      return { buttons, lastPage };
    }
    if (leftDotsVisible && !rightDotsVisible) {
      const range = getRange(lastPage - btns, lastPage);
      const buttons = [1, DOTS, ...range];
      return { buttons, lastPage };
    }
    return null;
  }, [currentPage, itemsPerPage, itemsQuantity]);

  return pagination;
};

export default usePagination;
