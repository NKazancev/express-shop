enum ErrorMessage {
  BAD_REQUEST = 'Bad request',
  UNAUTHORIZED = 'Unauthorized',
  FORBIDDEN = 'Forbidden',
  CREDENTIALS = 'Incorrect email or password',
  USER_EXISTS = 'Such user already exists',
  INTERNAL = 'Internal server error',
}

export default ErrorMessage;
