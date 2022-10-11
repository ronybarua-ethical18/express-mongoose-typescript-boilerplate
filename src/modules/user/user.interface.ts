import mongoose, { Document, Model } from "mongoose";
import { AccessAndRefreshTokens } from "../token/token.interface";

interface IUser {
  name: string;
  email: string;
  role: string;
  password: string;
  isVerified: boolean;
}

export interface IUserInfo extends IUser, Document {
  isPasswordMatch(password: string): Promise<boolean>;
}

export interface IUserModel extends Model<IUserInfo> {
  isEmailTaken(
    email: string,
    excludeUserId?: mongoose.ObjectId
  ): Promise<boolean>;
}

export type NewCreatedUser = Omit<IUser, 'isVerified'>;

export interface IUserWithTokens {
    user: IUserInfo;
    tokens: AccessAndRefreshTokens;
  }
  