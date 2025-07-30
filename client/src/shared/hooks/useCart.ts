import { ICartProduct } from '@shared/models/cart';
import { useEffect, useState } from 'react';

const useCartItemsCount = (
  items: Pick<ICartProduct, 'quantity'>[] | undefined
) => {
  const [itemsQuantity, setItemsQuantity] = useState<number>();

  useEffect(() => {
    setItemsQuantity(
      items?.reduce((acc, el) => {
        acc += el.quantity;
        return acc;
      }, 0)
    );
  }, [items]);

  return itemsQuantity;
};

const useCartTotalPrice = (items: ICartProduct[] | undefined) => {
  const [totalPrice, setTotalPrice] = useState<number>();

  useEffect(() => {
    setTotalPrice(
      items?.reduce((acc, el) => {
        el.product?.price
          ? (acc += el.product?.price * el.quantity)
          : (acc += 0);
        return acc;
      }, 0)
    );
  }, [items]);

  return totalPrice;
};

export { useCartItemsCount, useCartTotalPrice };
