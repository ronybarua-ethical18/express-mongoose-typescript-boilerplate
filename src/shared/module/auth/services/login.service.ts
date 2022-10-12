import httpStatus from "http-status";
import {
  IUserInfo,
  LoginCredentials,
} from "../interfaces/user.interface";
import { ApiError } from "../../../errors";
import UserModel from "../models/user.model";
/**
 * Login with username and password
 * @param {string} email
 * @param {string} password
 * @returns {Promise<IUserInfo>}
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