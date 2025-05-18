import { ICartProduct } from '@shared/models/cart';

const useCartTotal = (items: ICartProduct[] | undefined) => {
  const itemsQuantity = items?.reduce((acc, el) => {
    acc += el.quantity;
    return acc;
  }, 0);

  const totalPrice = items?.reduce((acc, el) => {
    acc += el.product.price * el.quantity;
    return acc;
  }, 0);

  return { itemsQuantity, totalPrice };
};

export default useCartTotal;
