import mongoose from 'mongoose';
import { IUser } from '../models/user.model.js';

const userSchema = new mongoose.Schema<IUser>(
  {
    user_name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    mobile_number: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
      select: false,
      minlength: 8,
    },
  },
  { timestamps: true }
);

export const User = mongoose.model<IUser>('User', userSchema);
