import { FC } from 'react';

import { IProduct } from '@shared/models/product';
import AdminProduct from '../AdminProduct/AdminProduct';

import styles from './AdminProductsList.module.css';

type TAdminProductsList = {
  products: Pick<
    IProduct,
    'id' | 'name' | 'price' | 'description' | 'image' | 'stock'
  >[];
};

const AdminProductsList: FC<TAdminProductsList> = ({ products }) => {
  const productsList = products?.map((product) => {
    return (
      <AdminProduct
        key={product.id}
        id={product.id}
        name={product.name}
        price={product.price}
        description={product.description}
        image={product.image}
        stock={product.stock}
      />
    );
  });

  return <ul className={styles.list}>{productsList}</ul>;
};

export default AdminProductsList;
