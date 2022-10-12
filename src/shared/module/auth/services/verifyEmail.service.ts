import httpStatus from "http-status";
import {
  IUserInfo
} from "../interfaces/user.interface";
import { ApiError } from "../../../errors";
import UserModel from "../models/user.model";
import * as TokenService from "../../../token/token.service";
import mongoose from "mongoose";
import tokenTypes from "../../../token/token.types";
import TokenModel from "../../../token/token.model";
import { getUserById } from ".";

/**
 * Verify email
 * @param {string} verifyEmailToken
 * @returns {Promise<IUserDoc | null>}
 */
 export const verifyEmail = async (
    verifyEmailToken: any
  ): Promise<IUserInfo | null> => {
    try {
      const verifyEmailTokenDoc = await TokenService.verifyToken(
        verifyEmailToken,
        tokenTypes.VERIFY_EMAIL
      );
      console.log(verifyEmailToken);
      const user = await getUserById(
        new mongoose.Types.ObjectId(verifyEmailTokenDoc.user)
      );
      if (!user) {
        throw new ApiError(httpStatus.NOT_FOUND, "User not found");
      }
      await TokenModel.deleteMany({
        user: user.id,
        type: tokenTypes.VERIFY_EMAIL,
      });
      const updatedUser = await UserModel.findByIdAndUpdate(user.id, {
        isVerified: true,
      });
      return updatedUser;
    } catch (error) {
      console.log(error);
      throw new ApiError(httpStatus.UNAUTHORIZED, "Email verification failed");
    }
  };