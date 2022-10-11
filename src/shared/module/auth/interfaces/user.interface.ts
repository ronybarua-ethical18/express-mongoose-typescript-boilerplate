import mongoose, { Document, Model } from "mongoose";
import { AccessAndRefreshTokens } from "../../../../shared/token/token.interface";

interface IUser {
  name: string;
  email: string;
  role: string;
  stores?: [];
  password: string;
  isVerified?: boolean;
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

export type NewCreatedUser = Omit<IUser, "isVerified">;

export type LoginCredentials = Omit<IUser, "login">;

export interface ISetPassword {
  token: string;
  password: string;
}
export interface IUserWithTokens {
  user: IUserInfo;
  tokens: AccessAndRefreshTokens;
}
