import { FC, MouseEvent, useState } from 'react';

import { STATIC_URL } from '@config/consts';
import ModalImage from '@modals/ModalImage/ModalImage';

import styles from './ProductGallery.module.css';

type TProductGallery = {
  images?: string[];
};

const ProductGallery: FC<TProductGallery> = ({ images }) => {
  const [modalImage, setModalImage] = useState<string | undefined>();
  const [modalVisible, setModalVisible] = useState<boolean>(false);

  const mainImageUrl = images && `${STATIC_URL}/${images[0]}`;

  const showImage = (e: MouseEvent) => {
    setModalVisible(true);
    const url = e.currentTarget.firstElementChild?.getAttribute('src');
    url && setModalImage(url);
  };

  const hideModal = () => setModalVisible(false);

  const thumbnailsPlaceholder = images
    ?.reduce((acc, el) => {
      return acc.concat(Array(5).fill(el));
    }, [] as string[])
    .map((file, index) => {
      return (
        <li key={index} onClick={showImage} className={styles.thumbnail}>
          <img src={`${STATIC_URL}/${file}`} alt="image" />
        </li>
      );
    });

  return (
    <div className={styles.container}>
      <ul className={styles.thumbnails}>{thumbnailsPlaceholder}</ul>

      <div onClick={showImage} className={styles.mainImage}>
        <img src={mainImageUrl} alt="image" />
      </div>

      {modalVisible && (
        <ModalImage onClose={hideModal} imageUrl={modalImage}></ModalImage>
      )}
    </div>
  );
};

export default ProductGallery;
