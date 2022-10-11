import httpStatus from "http-status";
import {
  ISetPassword,
  IUserInfo,
  LoginCredentials,
  NewCreatedUser,
} from "../interfaces/user.interface";
import { ApiError } from "../../../errors";
import UserModel from "../models/user.model";
import sendEmail from "../../../services/mail/sentMail";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

/**
 * @param {NewCreatedUser} userBody
 * @returns {Promise<IUserInfo>}
 */

export const signup = async (userBody: NewCreatedUser): Promise<IUserInfo> => {
  const isUniqueEmail = await UserModel.isEmailTaken(userBody.email);

  //checking the email is already exist or not
  if (isUniqueEmail) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Email already taken");
  }
  const user = await UserModel.create(userBody);
  const secret: any = process.env["JWT_SECRET"];
  const token = jwt.sign(
    {
      id: user._id,
      name: user.name,
      role: user.role,
    },
    secret
  );
  sendEmail(
    [user.email],
    {
      subject: "Verify Email",
      data: {
        name: user.name,
        role: user.role,
        ttoken: process.env["CLIENT_PORT"] + "/set-password" + token,
      },
    },
    "account_creation_email"
  );
  return user;
};

/**
 * Login with username and password
 * @param {string} email
 * @param {string} password
 * @returns {Promise<IUserDoc>}
 */
export const login = async (
  userCredentials: LoginCredentials
): Promise<IUserInfo> => {
  const user = await UserModel.findOne({ email: userCredentials.email });
  if (!user || !(await user.isPasswordMatch(userCredentials.password))) {
    throw new ApiError(httpStatus.UNAUTHORIZED, "Incorrect email or password");
  }
  return user;
};

// set password when user forgot the password
export const setPassword = async (
  setPasswordInfo: ISetPassword
): Promise<any> => {
  const secret: any = process.env["JWT_SECRET"];
  interface JwtPayload {
    id: string;
  }

  const { id } = jwt.verify(setPasswordInfo.token, secret) as JwtPayload;

  const hash = await bcrypt.hash(setPasswordInfo.password, 10);

  await UserModel.findByIdAndUpdate(id, {
    password: hash,
  });

  return "Your new password has set succesfully";
};
