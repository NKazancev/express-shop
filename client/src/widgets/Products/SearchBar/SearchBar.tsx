import { FC, KeyboardEvent, useEffect, useState } from 'react';

import search from './../../../shared/assets/search-icon.svg';
import styles from './SearchBar.module.css';

type TSearchBar = {
  setSearchQuery: (searchValue: string) => void;
};

const SearchBar: FC<TSearchBar> = ({ setSearchQuery }) => {
  const [searchValue, setSearchValue] = useState<string>('');

  useEffect(() => {
    const timer = setTimeout(() => {
      setSearchQuery(searchValue);
    }, 1000);
    return () => clearTimeout(timer);
  }, [searchValue]);

  const handleEnter = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      setSearchQuery(searchValue);
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
