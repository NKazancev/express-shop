import { useNavigate, useParams } from 'react-router';

import { useGetProductByIdQuery } from '@shared/api/productApi';

import ProductGallery from '@widgets/Product/ProductGallery/ProductGallery';
import ProductPanel from '@widgets/Product/ProductPanel/ProductPanel';
import ProductInfo from '@widgets/Product/ProductInfo/ProductInfo';
import ProductReviews from '@widgets/Product/ProductReviews/ProductReviews';

import styles from './ProductPage.module.css';

const ProductPage = () => {
  const { id } = useParams();
  const { data: product } = useGetProductByIdQuery(String(id), {
    refetchOnMountOrArgChange: true,
  });

  const navigate = useNavigate();
  const getPrevRoute = () => navigate(-1);

  return (
    <div className={styles.container}>
      <button onClick={getPrevRoute} className={styles.link}>
        &#8592; back to the catalogue
      </button>

      <div className={styles.content}>
        {product?.gallery.images && (
          <ProductGallery images={product?.gallery.images} />
        )}
        {product && <ProductPanel {...product} />}
      </div>

      <div className={styles.info}>
        <ProductInfo text={product?.info.text} />
      </div>

      <ProductReviews reviews={product?.reviews} productId={product?.id} />
    </div>
  );
};

export default ProductPage;
