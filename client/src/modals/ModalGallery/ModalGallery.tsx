import { FC, useEffect, useState } from 'react';

import { PORTAL_CONTAINER_ID, STATIC_URL } from '@config/consts';

import usePortal from '@shared/hooks/usePortal';
import Modal from '@shared/ui/Modal/Modal';

import arrowLeft from '@shared/assets/gallery-arrow-left.svg';
import arrowRight from '@shared/assets/gallery-arrow-right.svg';
import styles from './ModalGallery.module.css';

type TModalGallery = {
  onClose: () => void;
  images: string[];
  imageUrl: string;
};

const ModalGallery: FC<TModalGallery> = ({ onClose, images, imageUrl }) => {
  const [allImages, setAllImages] = useState<string[]>();
  const [visibleImage, setVisibleImage] = useState<string>(imageUrl);

  useEffect(() => {
    setAllImages(
      images.map((img) => {
        return `${STATIC_URL}/${img}`;
      })
    );
  }, [images]);

  const showPreviousImage = () => {
    if (allImages) {
      const visibleImageIndex = allImages.indexOf(visibleImage);
      setVisibleImage(allImages[visibleImageIndex - 1]);
      if (allImages.indexOf(visibleImage) === 0) {
        setVisibleImage(allImages[allImages.length - 1]);
      }
    }
  };
  const showNextImage = () => {
    if (allImages) {
      const visibleImageIndex = allImages.indexOf(visibleImage);
      setVisibleImage(allImages[visibleImageIndex + 1]);
      if (allImages.indexOf(visibleImage) === allImages.length - 1) {
        setVisibleImage(allImages[0]);
      }
    }
  };

  const content = (
    <Modal onClose={onClose}>
      <div className={styles.container}>
        <button
          type="button"
          onClick={showPreviousImage}
          className={styles.button}
        >
          <img src={arrowLeft} alt="arrow-icon" />
        </button>

        <div>
          <img src={visibleImage} alt="image" />
        </div>

        <button type="button" onClick={showNextImage} className={styles.button}>
          <img src={arrowRight} alt="arrow-icon" />
        </button>
      </div>
    </Modal>
  );

  const modal = usePortal(PORTAL_CONTAINER_ID, content);
  return modal;
};

export default ModalGallery;
