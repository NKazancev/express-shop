import { FC, MouseEvent, useState } from 'react';

import { STATIC_URL } from '@config/consts';
import ModalGallery from '@modals/ModalGallery/ModalGallery';

import styles from './ProductGallery.module.css';

type TProductGallery = {
  images: string[];
};

const ProductGallery: FC<TProductGallery> = ({ images }) => {
  const [mainImageUrl, setMainImageUrl] = useState<string>(
    `${STATIC_URL}/${images[0]}`
  );
  const [modalGallery, setModalGallery] = useState<boolean>(false);

  const handleThumbnailClick = (e: MouseEvent) => {
    const url = e.currentTarget.firstElementChild?.getAttribute('src');
    url && setMainImageUrl(url);
  };

  const showGallery = () => setModalGallery(true);
  const closeGallery = () => setModalGallery(false);

  const thumbnails = images?.map((file, index) => {
    const thumbnailUrl = `${STATIC_URL}/${file}`;
    return (
      <li
        key={index}
        onClick={handleThumbnailClick}
        className={styles.thumbnail}
      >
        <img src={thumbnailUrl} alt="image" />
      </li>
    );
  });

  return (
    <div className={styles.container}>
      <ul className={styles.thumbnails}>{thumbnails}</ul>

      <div onClick={showGallery} className={styles.mainImage}>
        <img src={mainImageUrl} alt="image" />
      </div>

      {modalGallery && (
        <ModalGallery
          onClose={closeGallery}
          images={images}
          imageUrl={mainImageUrl}
        />
      )}
    </div>
  );
};

export default ProductGallery;
