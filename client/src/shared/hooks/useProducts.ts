import UserRole from '@config/userRoles';
import { MAX_PRICE, MIN_PRICE } from '@config/consts';

import { useAppSelector } from '@shared/hooks/reduxHooks';
import { useGetProductsQuery } from '@shared/api/productApi';

const useProducts = (page: number, take: number, role: UserRole) => {
  const skip = take * (page - 1);

  const { searchQuery, productType, prices, brandFilters } = useAppSelector(
    (state) => state.filters
  );

  const queryArgs =
    role !== UserRole.ADMIN
      ? {
          searchQuery,
          productTypeId: productType.id || '',
          brandFilters,
          minPrice: prices[0],
          maxPrice: prices[1],
          skip,
          take,
        }
      : {
          searchQuery,
          productTypeId: '',
          brandFilters: '',
          minPrice: MIN_PRICE,
          maxPrice: MAX_PRICE,
          skip,
          take,
        };

  const { data: products } = useGetProductsQuery(queryArgs, {
    refetchOnMountOrArgChange: true,
  });

  return products;
};

export default useProducts;
