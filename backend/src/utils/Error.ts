import { StatusCode } from '../models/common.models.js';

export class ErrorHandler extends Error {
  public status_code: StatusCode;

  constructor(status_code: StatusCode, message: string) {
    super(message);
    this.status_code = status_code;

    Object.setPrototypeOf(this, ErrorHandler.prototype);

    Error.captureStackTrace(this, this.constructor);
  }
}
