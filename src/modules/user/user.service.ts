import httpStatus from "http-status";
import { ApiError } from "../errors";
import { IUserInfo, NewCreatedUser } from "./user.interface";
import UserModel from "./user.model";

/**
 * @param {NewCreatedUser} userBody
 * @returns {Promise<IUserInfo>}
 */

 export const createUser = async (userBody: NewCreatedUser): Promise<IUserInfo> => {
    if (await UserModel.isEmailTaken(userBody.email)) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Email already taken');
    }
    return UserModel.create(userBody);
  };