import { FC } from 'react';

import styles from './ProductInfo.module.css';

type TProductInfo = {
  info: string | undefined;
};

const ProductInfo: FC<TProductInfo> = ({ info }) => {
  const text = info?.split('\n').filter((item) => item !== '');

  return (
    <div className={styles.container}>
      <h5 className={styles.title}>Description:</h5>
      {text?.map((p, index) => {
        return (
          <p key={index} className={styles.text}>
            {p}
          </p>
        );
      })}
    </div>
  );
};
export default ProductInfo;
