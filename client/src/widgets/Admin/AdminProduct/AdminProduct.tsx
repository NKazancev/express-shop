import { FC } from 'react';

import { IProduct } from '@shared/models/product';
import { STATIC_URL } from '@config/consts';

import StockCounter from './StockCounter/StockCounter';

import penIcon from '@shared/assets/pen-icon.svg';
import xbutton from '@shared/assets/x-button.svg';
import styles from './AdminProduct.module.css';

const AdminProduct: FC<IProduct> = ({ id, image, name, price }) => {
  return (
    <li className={styles.item}>
      <div className={styles.image}>
        <img src={`${STATIC_URL}/${image}`} alt="image" />
      </div>

      <h5 className={styles.name}>{name}</h5>

      <StockCounter id={id} />

      <div className={styles.price}>{price}</div>

      <div className={styles.buttons}>
        <button>
          <img src={penIcon} alt="pen-icon" width={13} />
        </button>
        <button>
          <img src={xbutton} alt="delete-icon" width={13} />
        </button>
      </div>
    </li>
  );
};

export default AdminProduct;
