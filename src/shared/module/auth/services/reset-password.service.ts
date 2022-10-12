import httpStatus from "http-status";
import { ApiError } from "../../../errors";
import UserModel from "../models/user.model";
import bcrypt from "bcryptjs";
import * as TokenService from "../../../token/token.service";
import mongoose from "mongoose";
import tokenTypes from "../../../token/token.types";
import TokenModel from "../../../token/token.model";
import { getUserById } from ".";

/**
 * Reset password
 * @param {string} resetPasswordToken
 * @param {string} newPassword
 * @returns {Promise<void>}
 */
 export const resetPassword = async (
    resetPasswordToken: any,
    newPassword: string
  ): Promise<void> => {
    try {
      const resetPasswordTokenDoc = await TokenService.verifyToken(
        resetPasswordToken,
        tokenTypes.RESET_PASSWORD
      );
      const user = await getUserById(
        new mongoose.Types.ObjectId(resetPasswordTokenDoc.user)
      );
      if (!user) {
        throw new Error();
      }
      const hash = await bcrypt.hash(newPassword, 10);
      await UserModel.findByIdAndUpdate(user.id, {
        password: hash,
      });
      await TokenModel.deleteMany({
        user: user.id,
        type: tokenTypes.RESET_PASSWORD,
      });
    } catch (error) {
      console.log(error);
      throw new ApiError(httpStatus.UNAUTHORIZED, "Password reset failed");
    }
  };