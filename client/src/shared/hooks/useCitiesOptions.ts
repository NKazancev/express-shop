import { useEffect, useState } from 'react';

import { useLazyGetAllCitiesByCountryIdQuery } from '@shared/api/cityApi';
import { ICity } from '@shared/models/country';

const useCitiesOptions = (countryId: string | undefined) => {
  const [citiesOptions, setCitiesOptions] = useState<ICity[]>();
  const [trigger] = useLazyGetAllCitiesByCountryIdQuery();

  useEffect(() => {
    if (countryId) trigger(countryId).then((res) => setCitiesOptions(res.data));
  }, [countryId]);

  return citiesOptions;
};

export default useCitiesOptions;
