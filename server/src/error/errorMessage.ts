enum ErrorMessage {
  BAD_REQUEST = 'Bad request',
  UNAUTHORIZED = 'Unauthorized',
  FORBIDDEN = 'Forbidden',
  CREDENTIALS = 'Incorrect email or password',
  USER_EXISTS = 'Such user already exists',
  USERNAME_EXISTS = 'Such username already exists',
  PRODUCT_EXISTS = 'Such product already exists',
  PRODUCT_NOT_FOUND = 'Product not found',
  PRODUCT_TYPE_EXISTS = 'Such product type already exists',
  PRODUCT_TYPE_NOT_FOUND = 'Product type not found',
  PRODUCT_BRAND_EXISTS = 'Such product brand already exists',
  PRODUCT_BRAND_NOT_FOUND = 'Product brand not found',
  REVIEW_EXISTS = 'Review already exists',
  REVIEW_NOT_FOUND = 'Review not found',
  COUNTRY_EXISTS = 'Such country already exists',
  COUNTRY_NOT_FOUND = 'Country not found',
  CITY_EXISTS = 'Such city already exists',
  CITY_NOT_FOUND = 'City not found',
  UNDELIVERED_ORDERS = 'You have undelivered orders',
  INTERNAL = 'Internal server error',
}

export default ErrorMessage;
