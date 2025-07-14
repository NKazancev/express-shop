import { useAppSelector } from './reduxHooks';

import { useGetProductsQuery } from '@shared/api/productApi';

const useProducts = (page: number, take: number) => {
  const skip = take * (page - 1);

  const { searchQuery, productType, prices, brandFilters } = useAppSelector(
    (state) => state.filters
  );

  const { data: products } = useGetProductsQuery(
    {
      searchQuery,
      productType,
      brandFilters,
      minPrice: prices[0],
      maxPrice: prices[1],
      skip,
      take,
    },
    { refetchOnMountOrArgChange: true }
  );

  return products;
};

export default useProducts;
