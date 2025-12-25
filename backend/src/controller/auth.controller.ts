import { NextFunction, Request, Response } from 'express';
import { ErrorMessage, ResponseStatus, StatusCode } from '../models/common.models.js';
import { IUser, UserSignInRequest, UserSignUpRequest } from '../models/user.model.js';
import { User } from '../schema/user.schema.js';
import { ErrorHandler } from '../utils/Error.js';
import { Utils } from '../utils/Utils.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export const signUpUser = async (req: Request, res: Response, next: NextFunction) => {
  console.log('API ====>>>> /app/auth/signup');

  const signup_req = req.body as UserSignUpRequest;
  let user: IUser;

  if (Utils.isAnythingNull(signup_req.user_name, signup_req.password, signup_req.email)) {
    return next(new ErrorHandler(StatusCode.BadRequest, ErrorMessage.MISSING_INPUTS));
  }

  user = await User.findOne({ email: signup_req.email });
  if (!Utils.isNull(user)) {
    return res.status(StatusCode.BadRequest).json({
      status: ResponseStatus.Failed,
      message: 'User Already Exists With this email',
    });
  }

  // Hash password
  const hashed_password = await bcrypt.hash(signup_req.password, 10);

  user = (await User.create({ ...signup_req, password: hashed_password })).toObject();
  delete user.password;

  return res.status(StatusCode.Created).json({
    status: ResponseStatus.Success,
    message: 'Sign up successfully',
    user: user,
  });
};

export const signInUser = async (req: Request, res: Response, next: NextFunction) => {
  console.log('API ====>>>> /app/auth/signin');

  const signin_req = req.body as UserSignInRequest;
  let user: IUser;

  if (Utils.isAnythingNull(signin_req?.password, signin_req?.email))
    return next(new ErrorHandler(StatusCode.BadRequest, ErrorMessage.MISSING_INPUTS));

  user = await User.findOne({ email: signin_req.email }).select('+password');
  if (Utils.isNull(user)) {
    return res.status(StatusCode.NotFound).json({
      status: ResponseStatus.Failed,
      message: 'User Not Found',
    });
  }

  const isValidPassword = await bcrypt.compare(signin_req.password, user.password);
  console.log('isValidPassword', isValidPassword);
  if (Utils.isNull(isValidPassword)) {
    return next(new ErrorHandler(StatusCode.BadRequest, 'Invalid Password'));
  }

  const token = await jwt.sign({ user_id: user._id }, process.env.TOKEN_SECRET);

  const user_obj = user.toObject();

  delete user_obj.password;

  return res
    .status(StatusCode.Ok)
    .cookie('token', token, {
      expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
      httpOnly: true,
    })
    .json({
      status: ResponseStatus.Success,
      message: 'Login successfully',
      user: user,
    });
};

export const getUserList = async (req: Request, res: Response, next: NextFunction) => {
  console.log('API ====>>>> /app/auth/getUserList');

  let user: IUser[] = [];
  user = await User.find();
  return res.status(StatusCode.Ok).json({
    status: ResponseStatus.Success,
    message: 'successfully',
    data: user,
  });
};
