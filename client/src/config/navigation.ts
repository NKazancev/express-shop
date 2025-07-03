const adminNavigation = [
  { id: 1, path: '/admin', name: 'Add product', end: true },
  { id: 2, path: 'products', name: 'Products list' },
  { id: 3, path: 'orders', name: 'Orders' },
  { id: 4, path: 'typesbrands', name: 'Types/brands' },
  { id: 5, path: 'countriescities', name: 'Countries/cities' },
];

const userNavigation = [
  { id: 1, path: '/user', name: 'Info', end: true },
  { id: 2, path: 'orders', name: 'Orders' },
  { id: 3, path: 'reviews', name: 'Reviews' },
];

export { adminNavigation, userNavigation };
