import { FC } from 'react';
import { useNavigate } from 'react-router';

import usePagination from '@shared/hooks/usePagination';
import arrowLeft from '@shared/assets/pagination-arrow-left.svg';
import arrowRight from '@shared/assets/pagination-arrow-right.svg';

import PaginationButtons from './PaginationButtons/PaginationButtons';

import styles from './Pagination.module.css';

type TPagination = {
  currentPage: number;
  currentLocation: string;
  productsQuantity: number;
  itemsPerPage: number;
};

const Pagination: FC<TPagination> = (props) => {
  const { currentPage, currentLocation, productsQuantity, itemsPerPage } =
    props;

  const navigate = useNavigate();

  const pagination = usePagination(
    currentPage,
    productsQuantity,
    itemsPerPage
  ) as {
    buttons: (string | number)[];
    lastPage: number;
  } | null;

  const getPrevPage = () => {
    if (currentPage === 1) return;
    navigate(`${currentLocation}/page/${currentPage - 1}`);
  };

  const getNextPage = () => {
    if (currentPage === pagination?.lastPage) return;
    navigate(`${currentLocation}/page/${currentPage + 1}`);
  };

  return (
    <div className={styles.container}>
      <button type="button" onClick={getPrevPage} className={styles.arrowBtn}>
        <img src={arrowLeft} alt="arrow-left" />
      </button>

      {pagination && (
        <PaginationButtons
          buttons={pagination.buttons}
          currentPage={currentPage}
          currentLocation={currentLocation}
        />
      )}

      <button type="button" onClick={getNextPage} className={styles.arrowBtn}>
        <img src={arrowRight} alt="arrow-right" />
      </button>
    </div>
  );
};

export default Pagination;
