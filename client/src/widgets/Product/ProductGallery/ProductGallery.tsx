import { FC } from 'react';

import { STATIC_URL } from '@config/consts';
import { IProductGallery } from '@shared/models/product';

import styles from './ProductGallery.module.css';

const ProductGallery: FC<IProductGallery> = ({ images }) => {
  const thumbnailsPlaceholder = images
    ?.reduce((acc, el) => {
      return acc.concat(Array(5).fill(el));
    }, [] as string[])
    .map((file, index) => {
      return (
        <li key={index}>
          <img src={`${STATIC_URL}/${file}`} alt="image" />
        </li>
      );
    });

  const imageUrl = images && `${STATIC_URL}/${images[0]}`;

  return (
    <div className={styles.container}>
      <ul className={styles.thumbnails}>{thumbnailsPlaceholder}</ul>

      <div>
        <img src={imageUrl} alt="image" />
      </div>
    </div>
  );
};

export default ProductGallery;
