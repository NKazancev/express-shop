import { FC } from 'react';

import styles from './ProductInfo.module.css';

type TProductInfo = {
  text?: string;
};

const ProductInfo: FC<TProductInfo> = ({ text }) => {
  const description = text
    ?.trim()
    .split('\n')
    .map((p, index) => {
      return p !== '' ? (
        <p key={index} className={styles.text}>
          {p}
        </p>
      ) : null;
    });

  return (
    <div className={styles.container}>
      <h5 className={styles.title}>Description:</h5>
      {description}
    </div>
  );
};

export default ProductInfo;
