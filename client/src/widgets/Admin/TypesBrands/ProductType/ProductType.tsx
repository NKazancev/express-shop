import { FC } from 'react';

import { IProductType } from '@shared/models/product';
import { useDeleteTypeMutation } from '@shared/api/typeApi';

import xbutton from '@shared/assets/x-button.svg';
import styles from './ProductType.module.css';

const ProductType: FC<IProductType> = ({ id, name }) => {
  const [deleteType] = useDeleteTypeMutation();

  const handleDelete = async () => {
    try {
      await deleteType(id).unwrap();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <li className={styles.type}>
      <span>{name}</span>
      <button type="button" onClick={handleDelete}>
        <img src={xbutton} alt="x" width={10} />
      </button>
    </li>
  );
};

export default ProductType;
