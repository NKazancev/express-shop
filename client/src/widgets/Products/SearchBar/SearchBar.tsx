import { FC, useState } from 'react';

import styles from './SearchBar.module.css';

type TSearchBar = {
  setSearchQuery: (searchValue: string) => void;
};

const SearchBar: FC<TSearchBar> = ({ setSearchQuery }) => {
  const [searchValue, setSearchValue] = useState<string>('');

  return (
    <div>
      <input
        type="text"
        value={searchValue}
        autoComplete="off"
        className={styles.input}
        onChange={(e) => setSearchValue(e.target.value)}
      />

      <button
        type="button"
        className={styles.button}
        onClick={() => setSearchQuery(searchValue)}
      >
        Search
      </button>
    </div>
  );
};

export default SearchBar;
