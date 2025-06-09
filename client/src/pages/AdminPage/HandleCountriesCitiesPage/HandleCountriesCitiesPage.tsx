import CreateDeliveryCountry from '@processes/CreateDeliveryCountry';
import CountriesList from '@widgets/Admin/CountriesCities/CountriesList/CountriesList';
import CreateDeliveryCity from '@processes/CreateDeliveryCity';

import styles from './HandleCountriesCitiesPage.module.css';

const HandleCountriesCitiesPage = () => {
  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Delivery countries and cities</h2>

      <div className={styles.content}>
        <div className={styles.country}>
          <CreateDeliveryCountry />
          <CountriesList />
        </div>

        <CreateDeliveryCity />
      </div>
    </div>
  );
};

export default HandleCountriesCitiesPage;
