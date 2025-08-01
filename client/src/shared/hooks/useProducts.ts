import UserRole from '@config/userRoles';
import { MAX_PRICE, MIN_PRICE } from '@config/consts';

import { useAppSelector } from '@shared/hooks/reduxHooks';
import { useGetProductsQuery } from '@shared/api/productApi';

const useProducts = (page: number, itemsPerPage: number, role: UserRole) => {
  const { searchQuery, productType, prices, brandFilters } = useAppSelector(
    (state) => state.filters
  );
  const skip = itemsPerPage * (page - 1);

  const queryArgs =
    role !== UserRole.ADMIN
      ? {
          searchQuery,
          productTypeId: productType.id || '',
          brandFilters,
          minPrice: prices[0],
          maxPrice: prices[1],
          skip,
          take: itemsPerPage,
        }
      : {
          searchQuery,
          productTypeId: '',
          brandFilters: '',
          minPrice: MIN_PRICE,
          maxPrice: MAX_PRICE,
          skip,
          take: itemsPerPage,
        };

  const { data: products, isSuccess } = useGetProductsQuery(queryArgs, {
    refetchOnMountOrArgChange: true,
  });

  return { products, isSuccess };
};

export default useProducts;
