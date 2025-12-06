export enum StatusCode {
  Ok = 200,
  Created = 201,
  Accepted = 202,
  NoContent = 204,
  BadRequest = 400,
  Unauthorized = 401,
  Forbidden = 403,
  NotFound = 404,
  InternalServerError = 500,
  BadGateway = 502,
}

export enum ErrorMessage {
  MISSING_INPUTS = 'Required Field Missing',
}

export enum LoginMethod {
  EMAIL = 'EMAIL',
  OTP = 'OTP',
  MOBILE_NUMBER = 'MOBILE_NUMBER',
}

export enum ResponseStatus {
  Success = 'Success',
  Failed = 'Failed',
}

export interface IResponse {
  status: ResponseStatus;
  message: string;
  data?: any;
}
