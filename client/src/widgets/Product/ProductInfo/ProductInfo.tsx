import { FC } from 'react';

import { IProductInfo } from '@shared/models/product';

import styles from './ProductInfo.module.css';

const ProductInfo: FC<IProductInfo> = ({ text }) => {
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
