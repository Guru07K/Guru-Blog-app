import { NextFunction, Request, Response } from 'express';
import { ErrorMessage, IResponse, LoginMethod, ResponseStatus, StatusCode } from '../models/common.models.js';
import { IUser, UserSignInRequest, UserSignUpRequest } from '../models/user.model.js';
import { User } from '../schema/user.schema.js';
import { ErrorHandler } from '../utils/Error.js';
import { Utils } from '../utils/Utils.js';

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

  user = await User.create(signup_req);
  return res.status(StatusCode.Created).json({
    status: ResponseStatus.Success,
    message: 'Sign up successfully',
    data: user,
  });
};

export const signInUser = async (req: Request, res: Response, next: NextFunction) => {
  console.log('API ====>>>> /app/auth/signInUser');
  const signin_req = req.body as UserSignInRequest;

  let user: IUser;

  switch (signin_req.login_method) {
    case LoginMethod.EMAIL: {
      if (Utils.isAnythingNull(signin_req.password, signin_req.email))
        return next(new ErrorHandler(StatusCode.BadRequest, ErrorMessage.MISSING_INPUTS));

      user = await User.findOne({ email: signin_req.email, password: signin_req.password });
      break;
    }
  }

  if (Utils.isNull(user)) {
    return res.status(StatusCode.NotFound).json({
      status: ResponseStatus.Failed,
      message: 'User Not Found',
    });
  }

  return res
    .cookie('token', null, {
      expires: new Date(),
      httpOnly: true,
    })
    .status(StatusCode.Ok)
    .json({
      status: ResponseStatus.Success,
      message: 'Login successfully',
      data: user,
    });
};

export const getUserList = async (req: Request, res: Response, next: NextFunction) => {
  console.log('API ====>>>> /app/auth/getUserList');

  let user: IUser[] = [];
  user = await User.find();
  return res.status(StatusCode.Created).json({
    status: ResponseStatus.Success,
    message: 'successfully',
    data: user,
  });
};
