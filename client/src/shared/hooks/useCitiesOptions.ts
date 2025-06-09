import { useEffect, useState } from 'react';

import { useLazyGetAllCitiesByCountryIdQuery } from '@shared/api/cityApi';
import { ICity } from '@shared/models/country';

const useCitiesOptions = (
  countryId: string | undefined,
  isSuccess?: boolean
) => {
  const [citiesOptions, setCitiesOptions] = useState<ICity[]>();
  const [trigger] = useLazyGetAllCitiesByCountryIdQuery();

  useEffect(() => {
    if (countryId) trigger(countryId).then((res) => setCitiesOptions(res.data));
    if (isSuccess && countryId)
      trigger(countryId).then((res) => setCitiesOptions(res.data));
  }, [countryId, isSuccess]);

  return citiesOptions;
};

export default useCitiesOptions;
