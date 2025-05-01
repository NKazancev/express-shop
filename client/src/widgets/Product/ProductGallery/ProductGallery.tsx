import { FC } from 'react';
import { STATIC_URL } from '@config/consts';

import styles from './ProductGallery.module.css';

type TProductGallery = {
  images: string[] | undefined;
};

const ProductGallery: FC<TProductGallery> = ({ images }) => {
  const thumbnailsPlaceholder = images
    ?.reduce((acc, el) => {
      return acc.concat(Array(4).fill(el));
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
