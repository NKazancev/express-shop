import { OrderStatus } from '@config/orderStatus';
import { useEffect, useState } from 'react';

const useOrderStatusColor = (status: OrderStatus) => {
  const [orderStatusColor, setOrderStatusColor] = useState<string>();

  useEffect(() => {
    switch (status) {
      case OrderStatus.PENDING:
        setOrderStatusColor('#F9EA7A');
        break;
      case OrderStatus.ACCEPTED:
        setOrderStatusColor('#8BC5A7');
        break;
      case OrderStatus.OUT_FOR_DELIVERY:
        setOrderStatusColor('#7AB1F9');
        break;
      case OrderStatus.DELIVERED:
        setOrderStatusColor('#CACACA');
        break;
      case OrderStatus.CANCELLED:
        setOrderStatusColor('#F97A7A');
        break;
      default:
        setOrderStatusColor('#F9EA7A');
    }
  }, [status]);

  return orderStatusColor;
};

export default useOrderStatusColor;
