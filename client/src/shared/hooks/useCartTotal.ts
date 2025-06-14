import { ICartProduct } from '@shared/models/cart';
import { useEffect, useState } from 'react';

const useCartTotal = (items: ICartProduct[] | undefined) => {
  const [itemsQuantity, setItemsQuantity] = useState<number>();
  const [totalPrice, setTotalPrice] = useState<number>();

  useEffect(() => {
    setItemsQuantity(
      items?.reduce((acc, el) => {
        acc += el.quantity;
        return acc;
      }, 0)
    );
    setTotalPrice(
      items?.reduce((acc, el) => {
        acc += el.product.price * el.quantity;
        return acc;
      }, 0)
    );
  }, [items]);

  return { itemsQuantity, totalPrice };
};

export default useCartTotal;
