import { HttpStatus } from "../enums";
import { BaseException } from "./BaseException";

export class AppException extends BaseException {
  constructor(
    errorCode: string,
    message: string,
    data = {},
    statusCode = HttpStatus.INTERNAL_SERVER_ERROR,
  ) {
    super(errorCode, message, data, statusCode);
  }
}
