import { FC, MouseEvent } from 'react';
import { useNavigate } from 'react-router';

import styles from './PaginationButtons.module.css';

type TPaginationButtons = {
  buttons: (string | number)[];
  currentPage: number;
  currentLocation: string;
};

const PaginationButtons: FC<TPaginationButtons> = (props) => {
  const { buttons, currentLocation, currentPage } = props;

  const navigate = useNavigate();

  const getPage = (e: MouseEvent<HTMLButtonElement>) => {
    const page = e.currentTarget.textContent;
    navigate(`${currentLocation}/page/${page}`);
  };

  const list = buttons.map((btn, i) => {
    return typeof btn === 'number' ? (
      <li key={i}>
        <button
          type="button"
          onClick={getPage}
          className={currentPage == btn ? styles.activeBtn : styles.btn}
        >
          {btn}
        </button>
      </li>
    ) : (
      <li key={i}>
        <button type="button" className={styles.dots}>
          {btn}
        </button>
      </li>
    );
  });

  return <ul className={styles.buttonsList}>{list}</ul>;
};

export default PaginationButtons;
