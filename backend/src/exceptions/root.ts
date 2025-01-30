// structure of the error response
// message, status, code, error codes

export class HttpException extends Error {
  message: string;
  errorCode: unknown;
  statusCode: number;
  errors: ErrorCodes | null;

  constructor(
    message: string,
    errorCode: unknown,
    statusCode: number,
    errors: ErrorCodes | null
  ) {
    super(message);
    this.message = message;
    this.errorCode = errorCode;
    this.statusCode = statusCode;
    this.errors = errors;
  }
}

export enum ErrorCodes {
  USER_NOT_FOUND = 1001,
  USER_ALREADY_EXISTS = 1002,
  USER_FOLLOW_ERROR = 1003,
  POST_NOT_FOUND = 2001,
  POST_CREATION_ERROR = 2002,
  COMMENT_NOT_FOUND = 3001,
  UNPROCESSABLE_ENTITY = 4001,

}
