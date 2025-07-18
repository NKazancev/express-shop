import { FC, MouseEvent } from 'react';
import { useNavigate } from 'react-router';

import arrowLeft from '@shared/assets/pagination-arrow-left.svg';
import arrowRight from '@shared/assets/pagination-arrow-right.svg';
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

  const getPage = (e: MouseEvent<HTMLButtonElement>) => {
    const page = e.currentTarget.textContent;
    navigate(`${currentLocation}/page/${page}`);
  };

  const pagesQuantity = Math.ceil(productsQuantity / itemsPerPage);
  const buttonsArray = Array.from({ length: pagesQuantity }, (_, i) => i + 1);

  const buttonsList = buttonsArray.map((btn, i) => {
    return (
      <li key={i}>
        <button
          type="button"
          onClick={getPage}
          className={currentPage == btn ? styles.activeBtn : styles.btn}
        >
          {i + 1}
        </button>
      </li>
    );
  });

  const getPrevPage = () => {
    if (currentPage === 1) return;
    navigate(`${currentLocation}/page/${currentPage - 1}`);
  };

  const getNextPage = () => {
    if (currentPage === pagesQuantity) return;
    navigate(`${currentLocation}/page/${currentPage + 1}`);
  };

  return (
    <div className={styles.container}>
      <button type="button" onClick={getPrevPage} className={styles.arrowBtn}>
        <img src={arrowLeft} alt="arrow-left" />
      </button>

      <ul className={styles.buttonsList}>{buttonsList}</ul>

      <button type="button" onClick={getNextPage} className={styles.arrowBtn}>
        <img src={arrowRight} alt="arrow-right" />
      </button>
    </div>
  );
};

export default Pagination;
