import { ErrorCodes, HttpException} from "./root";

export class UserValidationError extends HttpException {
  constructor(message: string, errorCode: unknown, statusCode: number){
    super(message, errorCode, statusCode, null);
  }
}