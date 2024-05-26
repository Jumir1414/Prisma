import { HttpException, HttpStatusErrorCode } from "./root";

export class BadRequestsException extends HttpException {
  constructor(message: string, errorCode: HttpStatusErrorCode) {
    super(message, errorCode, errorCode, null);
  }
}
