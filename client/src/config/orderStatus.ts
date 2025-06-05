enum OrderStatus {
  PENDING = 'PENDING',
  ACCEPTED = 'ACCEPTED',
  OUT_FOR_DELIVERY = 'OUT_FOR_DELIVERY',
  DELIVERED = 'DELIVERED',
  CANCELLED = 'CANCELLED',
}

const orderStatusesData = [
  { id: 1, value: OrderStatus.PENDING, name: 'PENDING' },
  { id: 2, value: OrderStatus.ACCEPTED, name: 'ACCEPTED' },
  { id: 3, value: OrderStatus.OUT_FOR_DELIVERY, name: 'OUT FOR DELIVERY' },
  { id: 4, value: OrderStatus.DELIVERED, name: 'DELIVERED' },
  { id: 5, value: OrderStatus.CANCELLED, name: 'CANCELLED' },
];

export { OrderStatus, orderStatusesData };
