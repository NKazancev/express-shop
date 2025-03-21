import ErrorMessage from './errorMessage';

class ApiError extends Error {
  statusCode: number;
  message: ErrorMessage;

  constructor(statusCode: number, message: ErrorMessage) {
    super();
    this.statusCode = statusCode;
    this.message = message;
  }
}

export default ApiError;
