import { NavLink, useParams } from 'react-router';
import { useGetProductByIdQuery } from '@shared/api/productApi';
import { STATIC_URL } from '@config/consts';

import styles from './ProductPage.module.css';

const ProductPage = () => {
  const { id } = useParams();
  const { data: product } = useGetProductByIdQuery(String(id));

  return (
    <div className={styles.container}>
      <NavLink to="/" className={styles.link}>
        &#8592; back to the catalogue
      </NavLink>

      <div className={styles.content}>
        <div className={styles.gallery}>
          <ul className={styles.thumblist}>
            <li>
              {product?.gallery?.map((file, index) => {
                return (
                  <img src={`${STATIC_URL}/${file}`} alt="image" key={index} />
                );
              })}
            </li>
          </ul>

          <img src={`${STATIC_URL}/${product?.gallery[0]}`} alt="image" />
        </div>

        <div className={styles.description}>
          <h4 className={styles.title}>{product?.name}</h4>
          <span className={styles.price}>Price: {product?.price}</span>
          <button type="button" className={styles.button}>
            Add to cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
