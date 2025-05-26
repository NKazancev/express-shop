import CreateProduct from '@processes/CreateProduct';

import styles from './CreateProductPage.module.css';

const CreateProductPage = () => {
  return (
    <div>
      <h3 className={styles.title}>Add product</h3>
      <CreateProduct />
    </div>
  );
};

export default CreateProductPage;
