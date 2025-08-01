import CreateDeliveryCountry from '@processes/Admin/CreateDeliveryCountry';
import CreateDeliveryCity from '@processes/Admin/CreateDeliveryCity';

import styles from './HandleCountriesCitiesPage.module.css';

const HandleCountriesCitiesPage = () => {
  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Delivery countries and cities</h2>

      <div className={styles.content}>
        <CreateDeliveryCountry />
        <CreateDeliveryCity />
      </div>
    </div>
  );
};

export default HandleCountriesCitiesPage;
