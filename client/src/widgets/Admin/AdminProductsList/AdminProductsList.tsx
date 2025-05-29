import { useEffect } from 'react';

import { useAppDispatch } from '@shared/hooks/reduxHooks';
import { resetFilters } from '@shared/slices/filtersSlice';
import useProducts from '@shared/hooks/useProducts';

import AdminProduct from '../AdminProduct/AdminProduct';

import styles from './AdminProductsList.module.css';

const AdminProductsList = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(resetFilters());
  }, []);

  const products = useProducts();

  const productsList = products?.map((product) => {
    return <AdminProduct key={product.id} {...product} />;
  });

  return <ul className={styles.list}>{productsList}</ul>;
};

export default AdminProductsList;
