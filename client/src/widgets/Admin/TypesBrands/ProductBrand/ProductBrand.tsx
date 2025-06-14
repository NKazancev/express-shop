import { FC } from 'react';

import { IProductBrand } from '@shared/models/typesbrands';
import { useDeleteBrandMutation } from '@shared/api/brandApi';

import xbutton from '@shared/assets/x-button.svg';
import styles from './ProductBrand.module.css';

const ProductBrand: FC<IProductBrand> = ({ id, name }) => {
  const [deleteType] = useDeleteBrandMutation();

  const handleDelete = async () => {
    try {
      await deleteType(id).unwrap();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <li className={styles.brand}>
      <span>{name}</span>
      <button type="button" onClick={handleDelete}>
        <img src={xbutton} alt="x" width={10} />
      </button>
    </li>
  );
};

export default ProductBrand;
