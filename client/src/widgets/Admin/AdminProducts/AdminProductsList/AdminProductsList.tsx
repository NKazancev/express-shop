import { FC, useEffect } from 'react';

import { IProduct } from '@shared/models/product';
import { useAppDispatch } from '@shared/hooks/reduxHooks';
import { resetFilters } from '@shared/slices/filtersSlice';

import AdminProduct from '../AdminProduct/AdminProduct';

import styles from './AdminProductsList.module.css';

type TAdminProductsList = {
  products: IProduct[];
};

const AdminProductsList: FC<TAdminProductsList> = ({ products }) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(resetFilters());
  }, []);

  const productsList = products?.map((product) => {
    return <AdminProduct key={product.id} {...product} />;
  });

  return <ul className={styles.list}>{productsList}</ul>;
};

export default AdminProductsList;
