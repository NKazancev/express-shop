import CreateProduct from '@processes/CreateProduct';

import styles from './CreateProductPage.module.css';

const CreateProductPage = () => {
  return (
    <div>
      <h2 className={styles.title}>Add product</h2>
      <CreateProduct />
    </div>
  );
};

export default CreateProductPage;
