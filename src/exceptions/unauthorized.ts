import { HttpException, HttpStatusErrorCode } from "./root";

export class UnauthorizedException extends HttpException {
  constructor(message: string, errorCode: HttpStatusErrorCode, error: any) {
    super(message, errorCode, errorCode, error);
  }
}
