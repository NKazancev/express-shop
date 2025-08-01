import { FC } from 'react';

import { IProduct } from '@shared/models/product';
import AdminProduct from '../AdminProduct/AdminProduct';

import styles from './AdminProductsList.module.css';

type TAdminProductsList = {
  products: IProduct[];
};

const AdminProductsList: FC<TAdminProductsList> = ({ products }) => {
  const productsList = products?.map((product) => {
    return (
      <AdminProduct
        key={product.id}
        id={product.id}
        image={product.image}
        name={product.name}
        price={product.price}
        stock={product.stock}
      />
    );
  });

  return <ul className={styles.list}>{productsList}</ul>;
};

export default AdminProductsList;
