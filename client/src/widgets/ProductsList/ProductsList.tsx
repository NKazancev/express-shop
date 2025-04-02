import {
  useDeleteProductMutation,
  useGetProductsQuery,
} from '../../shared/api/productApi';
import { IProduct } from '../../shared/models/product';

import styles from './ProductsList.module.css';

const ProductsList = () => {
  const { data: products } = useGetProductsQuery();
  const [deleteProduct] = useDeleteProductMutation();

  const productsList = products?.map((product: IProduct) => {
    return (
      <li key={product.id} className={styles.product}>
        <img src={`http://localhost:5000/static/${product.image}`} />
        <h3>{product.name}</h3>
        <p>{product.price}</p>
        <p>{product.description}</p>

        <button
          type="button"
          onClick={() => deleteProduct(product.id)}
          className={styles.button}
        >
          Delete product
        </button>
      </li>
    );
  });

  return <ul className={styles.productList}>{productsList}</ul>;
};

export default ProductsList;
