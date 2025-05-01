import { NavLink, useParams } from 'react-router';

import { useGetProductByIdQuery } from '@shared/api/productApi';
import ProductGallery from '@widgets/Product/ProductGallery/ProductGallery';
import ProductInfo from '@widgets/Product/ProductInfo/ProductInfo';

import styles from './ProductPage.module.css';

const ProductPage = () => {
  const { id } = useParams();
  const { data: product } = useGetProductByIdQuery(String(id), {
    refetchOnMountOrArgChange: true,
  });

  return (
    <div className={styles.container}>
      <NavLink to="/" className={styles.link}>
        &#8592; back to the catalogue
      </NavLink>

      <div className={styles.content}>
        <ProductGallery images={product?.gallery} />
        {product && <ProductInfo product={product} />}
      </div>
    </div>
  );
};

export default ProductPage;
