import { HttpStatus } from "../enums";

export class BaseException extends Error {
  constructor(
    private errorCode: string, // App identifiable Code: Once an error is thrown the backend engineer can look at the stack trace ones and know where the error occured
    private customMessage: string,
    private data?: Record<string, any>,
    private statusCode: number = HttpStatus.INTERNAL_SERVER_ERROR,
  ) {
    super();
    this.setCustomMessage(customMessage);
    this.setData(data);
    this.setErrorCode(errorCode);
    this.setStatusCode(statusCode);
  }

  /**
   * setError
   */
  public setErrorCode(error: string) {
    this.errorCode = error;
    return this;
  }

  /**
   * setCustomMessage
   */
  public setCustomMessage(message: string) {
    this.customMessage = message;
    return this;
  }

  /**
   * setStatusCode
   */
  public setStatusCode(code: number) {
    this.statusCode = code;
    return this;
  }

  /**
   * setData
   */
  public setData(data?: Record<string, any>) {
    this.data = data ?? {};
    return this;
  }
}
