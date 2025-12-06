import { Document } from 'mongoose';
import { LoginMethod } from './common.models.js';

export interface IUser extends Document {
  user_name: string;
  email: string;
  password: string;
}

export class UserSignUpRequest {
  user_name: string;
  password: string;
  email: string;
  date_of_birth?: string;
}

export class UserSignInRequest {
  login_method: LoginMethod;
  email: string;
  password: string;
}
