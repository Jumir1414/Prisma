import { error } from "console";
import { HttpException, HttpStatusErrorCode } from "./root";

export class InternalException extends HttpException {
  constructor(message: string, error: any, errorCode: HttpStatusErrorCode) {
    super(message, errorCode, 500, error);
  }
}
