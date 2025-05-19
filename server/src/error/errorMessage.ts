enum ErrorMessage {
  BAD_REQUEST = 'Bad request',
  UNAUTHORIZED = 'Unauthorized',
  FORBIDDEN = 'Forbidden',
  CREDENTIALS = 'Incorrect email or password',
  USER_EXISTS = 'Such user already exists',
  PRODUCT_EXISTS = 'Such product already exists',
  PRODUCT_NOT_FOUND = 'Product not found',
  PRODUCT_TYPE_EXISTS = 'Such product type already exists',
  PRODUCT_TYPE_NOT_FOUND = 'Product type not found',
  PRODUCT_BRAND_EXISTS = 'Such product brand already exists',
  PRODUCT_BRAND_NOT_FOUND = 'Product brand not found',
  REVIEW_EXISTS = 'Review already exists',
  COUNTRY_EXISTS = 'Country already exists',
  COUNTRY_NOT_FOUND = 'Country not found',
  CITY_EXISTS = 'City already exists',
  CITY_NOT_FOUND = 'City not found',
  INTERNAL = 'Internal server error',
}

export default ErrorMessage;
