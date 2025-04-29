import { useParams } from 'react-router';
import { useGetProductByIdQuery } from '@shared/api/productApi';
import { STATIC_URL } from '@config/consts';

import styles from './ProductPage.module.css';

const ProductPage = () => {
  const { id } = useParams();
  const { data: product } = useGetProductByIdQuery(String(id));

  return (
    <div className={styles.container}>
      <div>
        {product?.gallery?.map((file, index) => {
          return <img src={`${STATIC_URL}/${file}`} alt="image" key={index} />;
        })}
      </div>

      <div>
        <h4>{product?.name}</h4>
        <p>{product?.description}</p>
        <span>{product?.price}</span>
      </div>
    </div>
  );
};

export default ProductPage;
