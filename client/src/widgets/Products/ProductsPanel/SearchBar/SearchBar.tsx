import { KeyboardEvent, useEffect, useState } from 'react';

import { useAppDispatch } from '@shared/hooks/reduxHooks';
import { setSearchQuery } from '@shared/slices/filtersSlice';

import search from '@shared/assets/search-icon.svg';
import styles from './SearchBar.module.css';

const SearchBar = () => {
  const [searchValue, setSearchValue] = useState<string>('');
  const dispatch = useAppDispatch();

  useEffect(() => {
    const timer = setTimeout(() => {
      dispatch(setSearchQuery(searchValue));
    }, 1000);
    return () => clearTimeout(timer);
  }, [searchValue]);

  const handleEnter = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      dispatch(setSearchQuery(searchValue));
    }
  };

  return (
    <div className={styles.container}>
      <input
        type="text"
        value={searchValue}
        autoComplete="off"
        placeholder="Search device..."
        className={styles.input}
        onChange={(e) => setSearchValue(e.target.value)}
        onKeyDown={handleEnter}
      />

      <div className={styles.icon}>
        <img src={search} />
      </div>
    </div>
  );
};

export default SearchBar;
