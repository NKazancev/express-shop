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
  INTERNAL = 'Internal server error',
}

export default ErrorMessage;
